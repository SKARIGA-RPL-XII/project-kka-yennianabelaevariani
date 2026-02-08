import React, { useState } from "react";
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
} from "lucide-react";

const ManajemenKategori = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Data dummy kategori gejala gess
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Pernapasan",
      count: 12,
      icon: <Wind size={24} />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      id: 2,
      name: "Pencernaan",
      count: 8,
      icon: <Activity size={24} />,
      color: "bg-orange-50 text-orange-600",
    },
    {
      id: 3,
      name: "Umum",
      count: 15,
      icon: <Stethoscope size={24} />,
      color: "bg-teal-50 text-teal-600",
    },
    {
      id: 4,
      name: "Mental",
      count: 10,
      icon: <Brain size={24} />,
      color: "bg-purple-50 text-purple-600",
    },
  ]);

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Menghapus kategori akan berpengaruh pada pertanyaan di dalamnya. Lanjutkan?",
      )
    ) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFF]">
      {/* Sidebar yang sudah dipisah sebelumnya */}
      <Sidebar />

      <main className="flex-1 p-10">
        {/* Header Section */}
        <header className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-2">
              Manajemen Kategori
            </h2>
            <p className="text-[#60a5fa] font-medium text-lg">
              Kelola kelompok gejala untuk akurasi analisis skrining kesehatan.
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
              placeholder="Cari kategori gejala..."
              className="w-full bg-[#F8FAFF] border border-blue-100 rounded-2xl py-3 px-12 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-sm font-medium"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white p-8 rounded-[40px] shadow-sm border border-blue-50 hover:shadow-xl hover:shadow-blue-50 transition-all group relative overflow-hidden"
            >
              {/* Decorative Circle */}
              <div
                className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 ${cat.color.split(" ")[0]}`}
              ></div>

              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${cat.color} shadow-sm`}>
                  {cat.icon}
                </div>
                <button className="text-blue-200 hover:text-blue-500 transition">
                  <MoreVertical size={20} />
                </button>
              </div>

              <h3 className="text-xl font-black text-blue-900 mb-2">
                {cat.name}
              </h3>
              <p className="text-sm font-bold text-[#60a5fa] mb-8">
                {cat.count} Pertanyaan Terkait
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
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 bg-blue-900 rounded-[35px] p-8 flex items-center justify-between text-white overflow-hidden relative">
          <div className="relative z-10">
            <h4 className="text-xl font-bold mb-2">
              Punya Kategori Gejala Baru?
            </h4>
            <p className="text-blue-200 text-sm max-w-md opacity-80">
              Pastikan setiap kategori memiliki minimal 5 pertanyaan untuk hasil
              analisis yang lebih komprehensif.
            </p>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3 bg-blue-800 -skew-x-12 translate-x-12 opacity-50"></div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="relative z-10 px-8 py-3 bg-white text-blue-900 font-bold rounded-2xl hover:bg-blue-50 transition shadow-lg"
          >
            Mulai Tambahkan
          </button>
        </div>
      </main>

      {/* Modal Overlay (Hanya Tampil Jika isModalOpen true) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-[40px] w-full max-w-lg p-10 shadow-2xl scale-in-center animate-in fade-in zoom-in duration-300">
            <h3 className="text-2xl font-black text-blue-900 mb-2">
              Tambah Kategori Baru
            </h3>
            <p className="text-blue-400 text-sm mb-8 font-medium">
              Buat klasifikasi gejala baru untuk sistem skrining.
            </p>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-blue-900 uppercase tracking-widest ml-1">
                  Nama Kategori
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Pencernaan"
                  className="w-full bg-[#F8FAFF] border border-blue-100 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-bold text-blue-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="py-4 rounded-2xl font-bold text-blue-400 hover:bg-blue-50 transition"
                >
                  Batalkan
                </button>
                <button className="py-4 bg-[#1e40af] text-white rounded-2xl font-bold hover:bg-blue-800 shadow-lg shadow-blue-100 transition">
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
