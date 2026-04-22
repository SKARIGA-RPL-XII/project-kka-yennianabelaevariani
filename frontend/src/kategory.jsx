import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./component/sidebar";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ManajemenKategori = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // State untuk Notifikasi ala Profile
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    kode: "",
    nama: "",
    deskripsi: "",
  });

  // Fungsi helper untuk menampilkan pesan sementara
  const showToast = (msg, isError = false) => {
    if (isError) {
      setError(msg);
      setTimeout(() => setError(""), 3000);
    } else {
      setMessage(msg);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const isDuplicateNama = categories.some(
    (cat) =>
      cat.nama.toLowerCase() === formData.nama.toLowerCase() &&
      cat.id !== editId,
  );

  const isDuplicateKode = categories.some(
    (cat) =>
      cat.kode.toUpperCase() === formData.kode.toUpperCase() &&
      cat.id !== editId,
  );

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/kategori");
      setCategories(res.data.data);
    } catch (err) {
      showToast("Gagal tarik data kategori gess.", true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const generateUniqueCode = (name) => {
    if (!name || name.length < 3) return "";
    let cleanName = name.replace(/\s+/g, "").toUpperCase();
    let suggestedCode = cleanName.substring(0, 3);
    const checkExist = (code) =>
      categories.some((cat) => cat.kode === code && cat.id !== editId);

    if (checkExist(suggestedCode)) {
      const middleIdx = Math.floor(cleanName.length / 2);
      suggestedCode = cleanName.substring(middleIdx - 1, middleIdx + 2);
    }
    if (checkExist(suggestedCode)) {
      suggestedCode = cleanName.substring(cleanName.length - 3);
    }
    return suggestedCode.substring(0, 3);
  };

  const handleNamaChange = (e) => {
    const newNama = e.target.value;
    const newKode = generateUniqueCode(newNama);
    setFormData({
      ...formData,
      nama: newNama,
      kode: isEditMode ? formData.kode : newKode,
    });
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setEditId(null);
    setFormData({ kode: "", nama: "", deskripsi: "" });
    setError("");
    setMessage("");
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setIsEditMode(true);
    setEditId(category.id);
    setFormData({
      kode: category.kode,
      nama: category.nama,
      deskripsi: category.deskripsi || "",
    });
    setError("");
    setMessage("");
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.kode || !formData.nama) {
      return showToast("Kode dan Nama wajib diisi gess!", true);
    }

    if (isDuplicateNama || isDuplicateKode) {
      return showToast("Nama atau Kode sudah ada, ganti yang lain gess!", true);
    }

    try {
      if (isEditMode) {
        await axios.put(
          `http://localhost:8000/api/kategori/${editId}`,
          formData,
        );
        showToast("Kategori berhasil diupdate secara aman! ✨");
      } else {
        await axios.post("http://localhost:8000/api/kategori", formData);
        showToast("Kategori baru berhasil ditambahkan! ✨");
      }

      setTimeout(() => {
        setIsModalOpen(false);
        fetchCategories();
      }, 1500);
    } catch (err) {
      if (err.response && err.response.status === 422) {
        const messages = Object.values(err.response.data.errors)
          .flat()
          .join(", ");
        showToast("Gagal: " + messages, true);
      } else {
        showToast("Koneksi gagal atau server mati.", true);
      }
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Menghapus kategori ini akan berpengaruh pada data terkait. Lanjutkan?",
      )
    ) {
      try {
        await axios.delete(`http://localhost:8000/api/kategori/${id}`);
        showToast("Kategori telah dihapus.");
        fetchCategories();
      } catch (err) {
        showToast("Gagal menghapus data.", true);
      }
    }
  };

  const filteredCategories = categories.filter(
    (cat) =>
      cat.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.kode.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFF]">
      <Sidebar />

      <main className="flex-1 p-10 relative">
        {/* Banner Notifikasi (Luar Modal) */}
        <AnimatePresence>
          {message && !isModalOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-green-50 border border-green-100 text-green-600 rounded-2xl text-sm font-bold flex items-center gap-2 italic shadow-sm"
            >
              <CheckCircle2 size={18} /> {message}
            </motion.div>
          )}
        </AnimatePresence>

        <header className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-black text-[#1e40af] tracking-tight mb-2">
              Manajemen Kategori
            </h2>
            <p className="text-slate-400 font-medium">
              Total ada {categories.length} kategori kesehatan yang aktif.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-[#1e40af] text-white px-8 py-4 rounded-[20px] font-bold hover:bg-blue-800 transition shadow-xl"
          >
            <Plus size={20} /> Tambah Kategori
          </button>
        </header>

        {/* Search Bar */}
        <div className="bg-white p-5 rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-white mb-10">
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300"
              size={18}
            />
            <input
              type="text"
              placeholder="Cari kategori..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F8FAFF] border border-blue-50 rounded-2xl py-3 px-12 focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm font-medium"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
            <p className="text-blue-400 font-bold italic">
              Sabar gess, lagi tarik data...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCategories.map((cat) => (
              <motion.div
                layout
                key={cat.id}
                className="bg-white p-8 rounded-[40px] shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-white hover:shadow-xl transition-all group relative overflow-hidden"
              >
                <div className="flex justify-end items-start mb-6">
                  <span className="bg-slate-100 text-slate-500 text-[10px] px-3 py-1 rounded-full font-black tracking-widest uppercase">
                    {cat.kode}
                  </span>
                </div>
                <h3 className="text-xl font-black text-blue-900 mb-2">
                  {cat.nama}
                </h3>
                <p className="text-sm font-medium text-[#60a5fa] mb-6 line-clamp-2 h-10">
                  {cat.deskripsi || "Kategori kesehatan HealthMate."}
                </p>
                <div className="flex gap-3 pt-6 border-t border-blue-50">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="px-3 py-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[40px] w-full max-w-lg p-10 shadow-2xl relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-8 top-8 text-slate-300 hover:text-red-500 transition"
              >
                <X size={24} />
              </button>

              <h3 className="text-2xl font-black text-blue-900 mb-2">
                {isEditMode ? "Update Kategori" : "Tambah Kategori Baru"}
              </h3>

              {/* Notifikasi dalam Modal */}
              <AnimatePresence mode="wait">
                {message && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-4 p-4 bg-green-50 border border-green-100 text-green-600 rounded-2xl text-xs font-bold flex items-center gap-2 italic"
                  >
                    <CheckCircle2 size={16} /> {message}
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-4 p-4 bg-red-50 border border-red-100 text-red-500 rounded-2xl text-xs font-bold flex items-center gap-2 italic"
                  >
                    <AlertCircle size={16} /> {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Nama Kategori
                  </label>
                  <input
                    type="text"
                    value={formData.nama}
                    onChange={handleNamaChange}
                    className="w-full bg-[#F8FAFF] border border-blue-50 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-blue-100 font-bold text-blue-900"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Kode Kategori
                  </label>
                  <input
                    type="text"
                    maxLength={3}
                    value={formData.kode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        kode: e.target.value.toUpperCase(),
                      })
                    }
                    className="w-full bg-[#F8FAFF] border border-blue-50 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-blue-100 font-bold text-blue-900"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Deskripsi
                  </label>
                  <textarea
                    value={formData.deskripsi}
                    onChange={(e) =>
                      setFormData({ ...formData, deskripsi: e.target.value })
                    }
                    className="w-full bg-[#F8FAFF] border border-blue-50 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-blue-100 font-medium text-blue-900 h-24"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="py-4 rounded-2xl font-bold text-slate-400 hover:bg-slate-50 transition"
                  >
                    Batalkan
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isDuplicateNama || isDuplicateKode}
                    className={`py-4 ${isDuplicateNama || isDuplicateKode ? "bg-slate-300" : "bg-[#1e40af] hover:bg-blue-800"} text-white rounded-2xl font-bold shadow-lg transition`}
                  >
                    {isEditMode ? "Simpan Perubahan" : "Simpan Kategori"}
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

export default ManajemenKategori;
