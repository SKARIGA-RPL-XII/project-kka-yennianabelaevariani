import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./component/sidebar";
import {
  Search,
  Plus,
  PencilLine,
  Trash2,
  Settings2,
  Layers,
  Activity,
  AlertCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ManajemenPertanyaan = () => {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");

  // --- STATE PAGINATION ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Maksimal 6 data per tabel

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resQuestions, resCategories] = await Promise.all([
        axios.get("http://localhost:8000/api/pertanyaanskrining "),
        axios.get("http://localhost:8000/api/kategori"),
      ]);
      const qData = resQuestions.data.data || [];
      const cData = resCategories.data.data || [];
      setQuestions(qData);
      setCategories(cData);
    } catch (err) {
      console.error("Gagal ambil data gess:", err);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Hapus pertanyaan ini dari sistem?")) {
      try {
        await axios.delete(`http://localhost:8000/api/pertanyaan/${id}`);
        fetchData();
      } catch (err) {
        alert("Gagal menghapus pertanyaan.");
      }
    }
  };

  // 1. Logic Filter & Search
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

  // --- 2. LOGIC PAGINATION ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentQuestions = filteredQuestions.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);

  // Reset ke halaman 1 kalau user lagi nyari/filter
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="flex min-h-screen bg-[#F8FAFF]">
      <Sidebar />

      <main className="flex-1 p-10">
        {/* Header Section */}
        <header className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-2">
              Manajemen Pertanyaan
            </h2>
            <p className="text-[#60a5fa] font-medium">
              Atur daftar pertanyaan skrining, kategori, dan bobot penilaian.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-[#1e40af] text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-800 transition shadow-lg shadow-blue-100">
            <Plus size={20} /> Tambah Pertanyaan
          </button>
        </header>

        {/* Info Cards Summary */}
        <div className="grid grid-cols-3 gap-6 mb-8">
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
                {questions.filter((q) => q.is_darurat).length} Pertanyaan
              </p>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white p-6 rounded-[30px] shadow-sm border border-blue-50 mb-8 flex gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300"
              size={18}
            />
            <input
              type="text"
              placeholder="Cari teks pertanyaan...."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F8FAFF] border border-blue-100 rounded-2xl py-3 px-12 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-sm"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#F8FAFF] text-blue-900 font-bold text-xs px-6 py-3 rounded-2xl border border-blue-100 outline-none cursor-pointer"
          >
            <option>Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.nama}>
                {cat.nama}
              </option>
            ))}
          </select>
        </div>

        {/* Table Questions */}
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
              <table className="w-full text-left">
                <thead className="bg-[#F8FAFF] border-b border-blue-50">
                  <tr>
                    <th className="px-8 py-5 text-sm font-bold text-blue-900 w-16 text-center">
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
                      className="hover:bg-blue-50/30 transition-colors group"
                    >
                      <td className="px-8 py-6 text-sm font-bold text-blue-300 text-center">
                        #{indexOfFirstItem + index + 1}
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-1">
                          <p className="font-bold text-blue-900 text-sm leading-relaxed max-w-md">
                            {q.teks_pertanyaan}
                          </p>
                          {q.is_darurat === 1 && (
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
                          <button className="p-2 text-blue-400 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all shadow-sm">
                            <PencilLine size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(q.id)}
                            className="p-2 text-red-300 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all shadow-sm"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* --- FOOTER PAGINATION --- */}
              <div className="px-8 py-4 bg-white border-t border-blue-50 flex items-center justify-between">
                <p className="text-xs font-bold text-blue-300">
                  Menampilkan {currentQuestions.length} dari{" "}
                  {filteredQuestions.length} data
                </p>
                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="p-2 rounded-xl border border-blue-100 text-blue-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-50 transition-all"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                        currentPage === i + 1
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                          : "text-blue-400 hover:bg-blue-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="p-2 rounded-xl border border-blue-100 text-blue-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-50 transition-all"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </>
          )}

          {!loading && filteredQuestions.length === 0 && (
            <div className="text-center py-20 bg-white">
              <p className="text-slate-400 font-medium italic">
                Pertanyaan tidak ditemukan gess...
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ManajemenPertanyaan;
