import React, { useState } from "react";
import Sidebar from "./component/sidebar";
import {
  Search,
  Plus,
  PencilLine,
  Trash2,
  Settings2,
  Layers,
  Activity,
} from "lucide-react";

const ManajemenPertanyaan = () => {
  // State untuk data pertanyaan
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "Apakah Anda merasa sesak napas saat melakukan aktivitas ringan?",
      category: "Pernapasan",
      weight: 5,
      type: "Skala Likert",
    },
    {
      id: 2,
      text: "Apakah Anda sering merasa pusing saat bangun tidur di pagi hari?",
      category: "Neurologis",
      weight: 3,
      type: "Skala Likert",
    },
    {
      id: 3,
      text: "Apakah terdapat bengkak pada bagian pergelangan kaki Anda?",
      category: "Kardiovaskular",
      weight: 4,
      type: "Skala Likert",
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Hapus pertanyaan ini dari sistem?")) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFF]">
      {/* Memanggil Sidebar yang sudah dipisah gess */}
      <Sidebar />

      <main className="flex-1 p-10">
        {/* Header Section */}
        <header className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-2">
              Manajemen Pertanyaan
            </h2>
            <p className="text-[#60a5fa] font-medium">
              Atur daftar pertanyaan skrining, kategori, dan bobot penilaian
              skor.
            </p>
          </div>

          <button className="flex items-center gap-2 bg-[#1e40af] text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-800 transition shadow-lg shadow-blue-100">
            <Plus size={20} /> Tambah Pertanyaan
          </button>
        </header>

        {/* Info Cards - Kategori Summary */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-[25px] border border-blue-50 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <Layers size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-300 uppercase">
                Total Kategori
              </p>
              <p className="text-xl font-bold text-blue-900">
                8 Kategori Gejala
              </p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-[25px] border border-blue-50 flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500">
              <Activity size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-300 uppercase">
                Total Pertanyaan
              </p>
              <p className="text-xl font-bold text-blue-900">
                {questions.length} Pertanyaan Aktif
              </p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-[25px] border border-blue-50 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-500">
              <Settings2 size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-300 uppercase">
                Max Bobot
              </p>
              <p className="text-xl font-bold text-blue-900">Skala 1 - 5</p>
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
              placeholder="Cari teks pertanyaan atau kategori...."
              className="w-full bg-[#F8FAFF] border border-blue-100 rounded-2xl py-3 px-12 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-sm"
            />
          </div>
          <select className="bg-[#F8FAFF] text-blue-900 font-bold text-xs px-6 py-3 rounded-2xl border border-blue-100 outline-none">
            <option>Semua Kategori</option>
            <option>Pernapasan</option>
            <option>Kardiovaskular</option>
          </select>
        </div>

        {/* Table Questions */}
        <div className="bg-white rounded-[40px] shadow-sm border border-blue-50 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#F8FAFF] border-b border-blue-50">
              <tr>
                <th className="px-8 py-5 text-sm font-bold text-blue-900 w-16">
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
              {questions.map((q, index) => (
                <tr
                  key={q.id}
                  className="hover:bg-blue-50/30 transition-colors"
                >
                  <td className="px-8 py-6 text-sm font-bold text-blue-300">
                    #{index + 1}
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-bold text-blue-900 text-sm leading-relaxed max-w-md">
                      {q.text}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[11px] font-black uppercase tracking-wider border border-blue-100">
                      {q.category}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-orange-50 text-orange-600 font-bold border border-orange-100">
                      {q.weight}
                    </div>
                  </td>
                  <td className="px-8 py-6">
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

          {/* Footer Info */}
          <div className="p-8 bg-[#F8FAFF] border-t border-blue-50">
            <div className="bg-white p-4 rounded-2xl border border-blue-100 flex items-start gap-3">
              <span className="text-xl">💡</span>
              <p className="text-xs text-[#60a5fa] leading-relaxed">
                <span className="font-bold text-blue-900">Tips:</span> Bobot
                nilai akan diakumulasi untuk menentukan tingkat risiko (Rendah,
                Sedang, Tinggi). Pastikan pertanyaan krusial memiliki bobot yang
                lebih tinggi.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManajemenPertanyaan;
