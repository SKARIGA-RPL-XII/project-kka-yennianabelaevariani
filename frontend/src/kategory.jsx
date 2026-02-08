import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./component/sidebar";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  MoreVertical,
  Activity,
  Wind,
  Stethoscope,
  Brain,
  Loader2,
  HeartPulse, // Icon tambahan untuk Kardiovaskular
} from "lucide-react";

const ManajemenKategori = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // State untuk form input (Tambah/Edit)
  const [formData, setFormData] = useState({
    kode: "",
    nama: "",
    deskripsi: "",
  });

  /**
   * 1. Fungsi Mapping Icon & Warna
   * Disesuaikan dengan data Seeder: Pernapasan, Kardiovaskular, Pencernaan, Saraf, Umum
   */
  const getCategoryStyle = (nama) => {
    const n = nama.toLowerCase();
    if (n.includes("napas"))
      return { icon: <Wind size={24} />, color: "bg-blue-50 text-blue-600" };
    if (n.includes("kardio") || n.includes("jantung"))
      return {
        icon: <HeartPulse size={24} />,
        color: "bg-red-50 text-red-600",
      };
    if (n.includes("cerna"))
      return {
        icon: <Activity size={24} />,
        color: "bg-orange-50 text-orange-600",
      };
    if (n.includes("saraf") || n.includes("mental"))
      return {
        icon: <Brain size={24} />,
        color: "bg-purple-50 text-purple-600",
      };

    // Default untuk 'Umum' atau kategori lainnya
    return {
      icon: <Stethoscope size={24} />,
      color: "bg-teal-50 text-teal-600",
    };
  };

  /**
   * 2. Ambil Data dari API Laravel
   */
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/kategori");
      // Pastikan response sesuai dengan struktur Controller: { data: [...] }
      setCategories(res.data.data);
    } catch (err) {
      console.error("Gagal tarik data kategori:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /**
   * 3. Simpan Data Baru
   */
  const handleSave = async () => {
    if (!formData.kode || !formData.nama)
      return alert("Kode dan Nama wajib diisi gess!");

    try {
      await axios.post("http://localhost:8000/api/kategori", formData);
      setIsModalOpen(false);
      setFormData({ kode: "", nama: "", deskripsi: "" });
      fetchCategories(); // Refresh list
    } catch (err) {
      alert("Gagal simpan! Kode kategori mungkin sudah dipakai.");
    }
  };

  /**
   * 4. Hapus Data
   */
  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Menghapus kategori ini akan berpengaruh pada data terkait. Lanjutkan?",
      )
    ) {
      try {
        await axios.delete(`http://localhost:8000/api/kategori/${id}`);
        fetchCategories();
      } catch (err) {
        alert("Gagal menghapus data.");
      }
    }
  };

  // Filter pencarian
  const filteredCategories = categories.filter(
    (cat) =>
      cat.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.kode.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFF]">
      <Sidebar />

      <main className="flex-1 p-10">
        {/* Header Section */}
        <header className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-2">
              Manajemen Kategori
            </h2>
            <p className="text-[#60a5fa] font-medium text-lg">
              Total ada {categories.length} kategori kesehatan yang aktif.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#1e40af] text-white px-8 py-4 rounded-[20px] font-bold hover:bg-blue-800 transition active:scale-95 shadow-xl shadow-blue-100"
          >
            <Plus size={20} /> Tambah Kategori
          </button>
        </header>

        {/* Search Bar */}
        <div className="bg-white p-5 rounded-[30px] shadow-sm border border-blue-50 mb-10">
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300"
              size={18}
            />
            <input
              type="text"
              placeholder="Cari kategori (contoh: Saraf atau SAR)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F8FAFF] border border-blue-100 rounded-2xl py-3 px-12 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-sm font-medium"
            />
          </div>
        </div>

        {/* Categories Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
            <p className="text-blue-400 font-bold italic">
              Sabar gess, lagi tarik data dari database...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => {
                const style = getCategoryStyle(cat.nama);
                return (
                  <div
                    key={cat.id}
                    className="bg-white p-8 rounded-[40px] shadow-sm border border-blue-50 hover:shadow-xl hover:shadow-blue-50 transition-all group relative overflow-hidden"
                  >
                    {/* Dekorasi Background */}
                    <div
                      className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 ${style.color.split(" ")[0]}`}
                    ></div>

                    <div className="flex justify-between items-start mb-6">
                      <div
                        className={`p-4 rounded-2xl ${style.color} shadow-sm`}
                      >
                        {style.icon}
                      </div>
                      <span className="bg-slate-100 text-slate-500 text-[10px] px-3 py-1 rounded-full font-black tracking-widest uppercase">
                        {cat.kode}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-blue-900 mb-2 leading-tight">
                      {cat.nama}
                    </h3>
                    <p className="text-sm font-medium text-[#60a5fa] mb-6 line-clamp-2 h-10">
                      {cat.deskripsi ||
                        "Kategori gejala kesehatan sistem tubuh."}
                    </p>

                    <div className="flex gap-3 pt-6 border-t border-blue-50">
                      <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-600 hover:text-white transition-all">
                        <Pencil size={14} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="px-3 py-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-slate-400 italic font-medium">
                  Data kategori tidak ditemukan gess...
                </p>
              </div>
            )}
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-12 bg-blue-900 rounded-[35px] p-8 flex items-center justify-between text-white overflow-hidden relative">
          <div className="relative z-10">
            <h4 className="text-xl font-bold mb-2">Informasi Sistem</h4>
            <p className="text-blue-200 text-sm max-w-md opacity-80">
              Setiap kategori ini akan muncul sebagai pilihan saat kamu membuat
              pertanyaan skrining baru.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="relative z-10 px-8 py-3 bg-white text-blue-900 font-bold rounded-2xl hover:bg-blue-50 transition shadow-lg"
          >
            Tambah Baru
          </button>
        </div>
      </main>

      {/* Modal Tambah Kategori */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-[40px] w-full max-w-lg p-10 shadow-2xl animate-in fade-in zoom-in duration-300">
            <h3 className="text-2xl font-black text-blue-900 mb-2">
              Tambah Kategori Baru
            </h3>
            <p className="text-blue-400 text-sm mb-8 font-medium">
              Buat klasifikasi gejala baru untuk database.
            </p>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-blue-900 uppercase tracking-widest ml-1">
                  Kode Kategori
                </label>
                <input
                  type="text"
                  placeholder="CONTOH: PAR"
                  maxLength={10}
                  value={formData.kode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      kode: e.target.value.toUpperCase(),
                    })
                  }
                  className="w-full bg-[#F8FAFF] border border-blue-100 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-blue-100 font-bold text-blue-900"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-blue-900 uppercase tracking-widest ml-1">
                  Nama Kategori
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Pernapasan"
                  value={formData.nama}
                  onChange={(e) =>
                    setFormData({ ...formData, nama: e.target.value })
                  }
                  className="w-full bg-[#F8FAFF] border border-blue-100 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-blue-100 font-bold text-blue-900"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-blue-900 uppercase tracking-widest ml-1">
                  Deskripsi
                </label>
                <textarea
                  placeholder="Jelaskan secara singkat..."
                  value={formData.deskripsi}
                  onChange={(e) =>
                    setFormData({ ...formData, deskripsi: e.target.value })
                  }
                  className="w-full bg-[#F8FAFF] border border-blue-100 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-blue-100 font-medium text-blue-900 h-24"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="py-4 rounded-2xl font-bold text-blue-400 hover:bg-blue-50 transition"
                >
                  Batalkan
                </button>
                <button
                  onClick={handleSave}
                  className="py-4 bg-[#1e40af] text-white rounded-2xl font-bold hover:bg-blue-800 shadow-lg shadow-blue-100 transition"
                >
                  Simpan Kategori
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManajemenKategori;
