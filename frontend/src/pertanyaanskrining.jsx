import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./component/sidebar";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  PencilLine,
  Trash2,
  Layers,
  Activity,
  AlertCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const ManajemenPertanyaan = () => {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");

  // --- STATE NOTIFIKASI ---
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // --- STATE UNTUK CHECKBOX ---
  const [selectedItems, setSelectedItems] = useState([]);

  // --- STATE UNTUK MODAL & CRUD ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    kategori_id: "",
    teks_pertanyaan: "",
    bobot: 1,
    is_darurat: false,
  });

  // --- STATE PAGINATION ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Helper Toast
  const showToast = (msg, type = "success") => {
    if (type === "success") {
      setMessage(msg);
      setTimeout(() => setMessage(""), 3000);
    } else {
      setError(msg);
      setTimeout(() => setError(""), 3000);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resQuestions, resCategories] = await Promise.all([
        axios.get("http://localhost:8000/api/pertanyaanskrining"),
        axios.get("http://localhost:8000/api/kategori"),
      ]);
      setQuestions(resQuestions.data.data || []);
      setCategories(resCategories.data.data || []);
      setSelectedItems([]);
    } catch (err) {
      console.error("Gagal ambil data gess:", err);
      showToast("Gagal mengambil data dari server.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddOpen = () => {
    setIsEditMode(false);
    setEditId(null);
    setFormData({
      kategori_id: "",
      teks_pertanyaan: "",
      bobot: 1,
      is_darurat: false,
    });
    setIsModalOpen(true);
  };

  const handleEditOpen = (q) => {
    setIsEditMode(true);
    setEditId(q.id);
    setFormData({
      kategori_id: q.kategori_id,
      teks_pertanyaan: q.teks_pertanyaan,
      bobot: q.bobot,
      is_darurat: q.is_darurat === 1 || q.is_darurat === true,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.kategori_id || !formData.teks_pertanyaan) {
      return showToast(
        "Kategori dan Teks Pertanyaan wajib diisi gess!",
        "error",
      );
    }

    try {
      setIsProcessing(true);
      const payload = {
        ...formData,
        is_darurat: formData.is_darurat ? 1 : 0,
      };

      if (isEditMode) {
        await axios.put(
          `http://localhost:8000/api/pertanyaanskrining/${editId}`,
          payload,
        );
        showToast("Pertanyaan berhasil diperbarui secara aman! ✨");
      } else {
        await axios.post(
          "http://localhost:8000/api/pertanyaanskrining",
          payload,
        );
        showToast("Pertanyaan baru berhasil ditambahkan! ✨");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      showToast(
        err.response?.data?.message || "Gagal menyimpan data gess.",
        "error",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    if (window.confirm("Hapus pertanyaan ini dari sistem?")) {
      try {
        setIsProcessing(true);
        await axios.delete(
          `http://localhost:8000/api/pertanyaanskrining/${id}`,
        );
        showToast("Pertanyaan berhasil dihapus!");
        fetchData();
      } catch (err) {
        showToast("Gagal menghapus pertanyaan.", "error");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleBulkDelete = async () => {
    if (
      window.confirm(
        `Yakin ingin menghapus ${selectedItems.length} data sekaligus?`,
      )
    ) {
      try {
        setIsProcessing(true);
        const res = await axios.post(
          "http://localhost:8000/api/pertanyaanskrining/bulk-delete",
          {
            ids: selectedItems,
          },
        );
        showToast(res.data.message || "Data masal berhasil dihapus!");
        fetchData();
        setSelectedItems([]);
      } catch (err) {
        showToast("Terjadi kesalahan saat menghapus data masal.", "error");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const toggleSelectAll = () => {
    const currentIds = currentQuestions.map((q) => q.id);
    const isAllSelected = currentIds.every((id) => selectedItems.includes(id));

    if (isAllSelected) {
      setSelectedItems((prev) => prev.filter((id) => !currentIds.includes(id)));
    } else {
      setSelectedItems((prev) => [...new Set([...prev, ...currentIds])]);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // Logic Filter
  const filteredQuestions = Array.isArray(questions)
    ? questions.filter((q) => {
        const matchSearch = (q.teks_pertanyaan || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchCategory =
          selectedCategory === "Semua Kategori" ||
          q.kategori?.nama === selectedCategory;
        return matchSearch && matchCategory;
      })
    : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentQuestions = filteredQuestions.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedItems([]);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="flex min-h-screen bg-[#F8FAFF]">
      <Sidebar />

      <main className="flex-1 p-10">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-2">
              Manajemen Pertanyaan
            </h2>
            <p className="text-[#60a5fa] font-medium">
              Atur daftar pertanyaan skrining dan penilaian.
            </p>
          </div>
          <div className="flex gap-4">
            {selectedItems.length > 0 && (
              <button
                onClick={handleBulkDelete}
                disabled={isProcessing}
                className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-red-600 transition shadow-lg shadow-red-100 disabled:opacity-50"
              >
                {isProcessing ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Trash2 size={20} />
                )}
                Hapus ({selectedItems.length})
              </button>
            )}
            <button
              onClick={handleAddOpen}
              className="flex items-center gap-2 bg-[#1e40af] text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-800 transition shadow-lg shadow-blue-100"
            >
              <Plus size={20} /> Tambah Pertanyaan
            </button>
          </div>
        </header>

        {/* --- NOTIFIKASI ALA PROFILE --- */}
        <AnimatePresence mode="wait">
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 p-4 bg-green-50 border border-green-100 text-green-600 rounded-2xl text-sm font-bold flex items-center gap-2 italic"
            >
              <span>✨</span> {message}
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-2 italic"
            >
              <span>⚠️</span> {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Cards Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-[25px] border border-blue-50 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <Layers size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-300 uppercase">
                Total Kategori
              </p>
              <p className="text-xl font-bold text-blue-900">
                {categories.length} Kategori
              </p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-[25px] border border-blue-50 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500">
              <Activity size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-300 uppercase">
                Total Pertanyaan
              </p>
              <p className="text-xl font-bold text-blue-900">
                {questions.length} Item
              </p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-[25px] border border-blue-50 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500">
              <AlertCircle size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-300 uppercase">
                Kasus Darurat
              </p>
              <p className="text-xl font-bold text-blue-900">
                {
                  questions.filter(
                    (q) => q.is_darurat === 1 || q.is_darurat === true,
                  ).length
                }{" "}
                Pertanyaan
              </p>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white p-6 rounded-[30px] shadow-sm border border-blue-50 mb-8 flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300"
              size={18}
            />
            <input
              type="text"
              placeholder="Cari teks pertanyaan...."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F8FAFF] border border-blue-100 rounded-2xl py-3 px-12 focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm font-medium"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#F8FAFF] text-blue-900 font-bold text-xs pl-6 pr-12 py-3 rounded-2xl border border-blue-100 outline-none cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%231e40af%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C/polyline%3E%3C/svg%3E')] bg-no-repeat bg-[position:right_1.2rem_center] bg-[length:16px]"
          >
            <option>Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.nama}>
                {cat.nama}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[40px] shadow-sm border border-blue-50 overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
              <p className="text-blue-400 font-bold italic">
                Menghubungkan ke pusat data...
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#F8FAFF] border-b border-blue-50">
                    <tr>
                      <th className="px-6 py-5 w-12 text-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-blue-200 text-blue-600 cursor-pointer"
                          checked={
                            currentQuestions.length > 0 &&
                            currentQuestions.every((q) =>
                              selectedItems.includes(q.id),
                            )
                          }
                          onChange={toggleSelectAll}
                        />
                      </th>
                      <th className="px-4 py-5 text-sm font-bold text-blue-900 w-16 text-center">
                        No.
                      </th>
                      <th className="px-8 py-5 text-sm font-bold text-blue-900">
                        Teks Pertanyaan
                      </th>
                      <th className="px-8 py-5 text-sm font-bold text-blue-900">
                        Kategori
                      </th>
                      <th className="px-8 py-5 text-sm font-bold text-blue-900 text-center">
                        Bobot
                      </th>
                      <th className="px-8 py-5 text-sm font-bold text-blue-900 text-center">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-50">
                    {currentQuestions.map((q, index) => (
                      <tr
                        key={q.id}
                        className={`hover:bg-blue-50/30 group ${selectedItems.includes(q.id) ? "bg-blue-50/50" : ""}`}
                      >
                        <td className="px-6 py-6 text-center">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-blue-200 text-blue-600 cursor-pointer"
                            checked={selectedItems.includes(q.id)}
                            onChange={() => handleCheckboxChange(q.id)}
                          />
                        </td>
                        <td className="px-4 py-6 text-sm font-bold text-blue-300 text-center">
                          #{indexOfFirstItem + index + 1}
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col gap-1">
                            <p className="font-bold text-blue-900 text-sm max-w-md">
                              {q.teks_pertanyaan}
                            </p>
                            {(q.is_darurat === 1 || q.is_darurat === true) && (
                              <span className="flex items-center gap-1 text-[10px] text-red-500 font-bold uppercase tracking-tighter">
                                <AlertCircle size={12} /> Red Flag / Darurat
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-wider border border-blue-100">
                            {q.kategori?.nama || "Tanpa Kategori"}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-orange-50 text-orange-600 font-bold border border-orange-100">
                            {q.bobot}
                          </div>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <div className="flex items-center justify-center gap-3">
                            <button
                              onClick={() => handleEditOpen(q)}
                              className="p-2 text-blue-400 hover:bg-blue-50 hover:text-blue-600 rounded-xl shadow-sm transition-all"
                            >
                              <PencilLine size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(q.id)}
                              className="p-2 text-red-300 hover:bg-red-50 hover:text-red-500 rounded-xl shadow-sm transition-all"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-8 py-4 bg-white border-t border-blue-50 flex items-center justify-between">
                <p className="text-xs font-bold text-blue-300">
                  Menampilkan {currentQuestions.length} data
                </p>
                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="p-2 rounded-xl border border-blue-100 text-blue-400 disabled:opacity-30 hover:bg-blue-50 transition-all"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${currentPage === i + 1 ? "bg-blue-600 text-white shadow-lg" : "text-blue-400 hover:bg-blue-50"}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="p-2 rounded-xl border border-blue-100 text-blue-400 disabled:opacity-30 hover:bg-blue-50 transition-all"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-[40px] w-full max-w-lg p-10 shadow-2xl relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-8 top-8 text-slate-300 hover:text-red-500 transition"
              >
                <X size={24} />
              </button>
              <h3 className="text-2xl font-black text-blue-900 mb-2">
                {isEditMode ? "Edit Pertanyaan" : "Tambah Pertanyaan"}
              </h3>
              <p className="text-blue-400 text-sm mb-8 font-medium">
                Lengkapi detail pertanyaan skrining kesehatan.
              </p>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-blue-900 uppercase tracking-widest ml-1">
                    Kategori
                  </label>
                  <select
                    value={formData.kategori_id}
                    onChange={(e) =>
                      setFormData({ ...formData, kategori_id: e.target.value })
                    }
                    className="w-full bg-[#F8FAFF] border border-blue-100 rounded-2xl py-4 px-6 font-bold text-blue-900 outline-none appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%231e40af%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C/polyline%3E%3C/svg%3E')] bg-no-repeat bg-[position:right_1.5rem_center] bg-[length:18px]"
                  >
                    <option value="">Pilih Kategori...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nama}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-blue-900 uppercase tracking-widest ml-1">
                    Teks Pertanyaan
                  </label>
                  <textarea
                    placeholder="Tuliskan pertanyaan di sini..."
                    value={formData.teks_pertanyaan}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        teks_pertanyaan: e.target.value,
                      })
                    }
                    className="w-full bg-[#F8FAFF] border border-blue-100 rounded-2xl py-4 px-6 font-medium text-blue-900 h-24 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-blue-900 uppercase tracking-widest ml-1">
                      Bobot (1-4)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="4"
                      value={formData.bobot}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1;
                        const safeVal = Math.min(Math.max(val, 1), 4);
                        setFormData({
                          ...formData,
                          bobot: safeVal,
                          is_darurat: safeVal === 4,
                        });
                      }}
                      className="w-full bg-[#F8FAFF] border border-blue-100 rounded-2xl py-4 px-6 font-bold text-blue-900 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-blue-900 uppercase tracking-widest ml-1">
                      Tingkat Bahaya
                    </label>
                    <div
                      onClick={() =>
                        setFormData({
                          ...formData,
                          is_darurat: !formData.is_darurat,
                          bobot: !formData.is_darurat
                            ? 4
                            : formData.bobot === 4
                              ? 3
                              : formData.bobot,
                        })
                      }
                      className={`flex items-center justify-center gap-2 py-4 px-6 rounded-2xl border cursor-pointer transition-all font-bold ${formData.is_darurat ? "bg-red-50 border-red-200 text-red-500" : "bg-blue-50 border-blue-100 text-blue-400"}`}
                    >
                      <AlertCircle size={18} />{" "}
                      {formData.is_darurat ? "Darurat" : "Normal"}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    disabled={isProcessing}
                    className="py-4 rounded-2xl font-bold text-blue-400 hover:bg-blue-50 transition disabled:opacity-50"
                  >
                    Batalkan
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isProcessing}
                    className="py-4 bg-[#1e40af] text-white rounded-2xl font-bold hover:bg-blue-800 shadow-lg shadow-blue-100 transition flex items-center justify-center gap-2"
                  >
                    {isProcessing && (
                      <Loader2 className="animate-spin" size={18} />
                    )}
                    {isEditMode ? "Simpan Perubahan" : "Simpan Pertanyaan"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManajemenPertanyaan;
