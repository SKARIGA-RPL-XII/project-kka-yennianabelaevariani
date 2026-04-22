import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./component/navbaru";
import {
  CheckCircle,
  AlertCircle,
  XCircle,
  MessageCircle,
  RefreshCcw,
} from "lucide-react";

const HasilSkrining = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Ambil data dari state (default ke 'Resiko Rendah' jika state tidak terkirim)
  const { status = "Resiko Rendah", total_skor = 0 } = location.state || {};

  /**
   * Konfigurasi Visual Dinamis
   * Mengatur warna background, border, teks, icon, dan konten saran
   * secara otomatis berdasarkan status.
   */
  const statusConfig = {
    "Resiko Tinggi": {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-700",
      accent: "bg-red-600",
      icon: <XCircle className="text-red-600" size={44} />,
      saran: [
        "Segera lakukan pemeriksaan ke dokter atau puskesmas terdekat.",
        "Kompres bagian yang memar dengan es batu yang dibalut kain selama 15 menit.",
        "Jika mengalami batuk terus-menerus dan sesak napas, segera cari bantuan medis.",
        "Pantau suhu tubuh secara berkala.",
      ],
    },
    "Resiko Sedang": {
      bg: "bg-orange-50",
      border: "border-orange-200",
      text: "text-orange-700",
      accent: "bg-orange-500",
      icon: <AlertCircle className="text-orange-500" size={44} />,
      saran: [
        "Istirahat total dan hindari aktivitas fisik yang berat untuk sementara.",
        "Minum air putih minimal 2 liter sehari dan konsumsi makanan bergizi.",
        "Gunakan masker jika Anda mengalami batuk atau flu ringan.",
        "Lakukan observasi mandiri selama 1x24 jam kedepan.",
      ],
    },
    "Resiko Rendah": {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-700",
      accent: "bg-green-600",
      icon: <CheckCircle className="text-green-600" size={44} />,
      saran: [
        "Kondisi Anda saat ini terpantau stabil dan normal.",
        "Tetap jaga pola makan sehat dan rutin berolahraga.",
        "Pastikan waktu istirahat cukup (7-8 jam per hari).",
        "Gunakan aplikasi ini secara rutin untuk pengecekan berkala.",
      ],
    },
  };

  // Pilih konfigurasi berdasarkan status saat ini
  const config = statusConfig[status] || statusConfig["Resiko Rendah"];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* KOLOM KIRI & TENGAH: HASIL & SARAN */}
          <div className="lg:col-span-2 space-y-6">
            {/* Kartu Hasil Utama */}
            <div
              className={`p-8 rounded-[2rem] border-2 shadow-sm transition-all duration-500 ${config.bg} ${config.border}`}
            >
              <div className="flex items-center gap-5 mb-8">
                <div className="p-2 bg-white rounded-2xl shadow-sm">
                  {config.icon}
                </div>
                <div>
                  <h2 className={`text-3xl font-black ${config.text}`}>
                    {status}
                  </h2>
                  <p className="text-gray-500 font-semibold tracking-wide uppercase text-xs mt-1">
                    Skor Diagnosa:{" "}
                    <span className="text-gray-800">{total_skor} Poin</span>
                  </p>
                </div>
              </div>

              {/* List Saran Penanganan */}
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white shadow-inner">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className={`w-2 h-5 rounded-full ${config.accent}`} />
                  Saran Penanganan & Tindakan
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {config.saran.map((item, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-gray-600 text-sm leading-relaxed bg-gray-50/50 p-3 rounded-xl border border-gray-100"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${config.accent}`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* BOX PROMOSI CHATBOT AI */}
            <div className="bg-gradient-to-br from-[#2563EB] to-[#1E40AF] p-8 rounded-[2rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-blue-100">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">
                  Punya pertanyaan medis?
                </h3>
                <p className="text-blue-100 opacity-90 max-w-md">
                  Jangan ragu untuk berkonsultasi lebih lanjut mengenai gejala
                  Anda dengan Chatbot Kesehatan bertenaga AI kami.
                </p>
              </div>
              <button
                onClick={() => navigate("/c")}
                className="px-8 py-4 bg-white text-blue-600 font-extrabold rounded-2xl flex items-center gap-3 hover:bg-blue-50 hover:-translate-y-1 transition-all active:scale-95 shadow-lg"
              >
                <MessageCircle size={22} strokeWidth={2.5} />
                Tanya Chatbot
              </button>
            </div>
          </div>

          {/* KOLOM KANAN: LEGENDA & NAVIGASI */}
          <div className="space-y-6">
            {/* Panduan Tingkat Resiko (Sesuai Referensi Gambar) */}
            <div className="bg-white p-7 rounded-[2rem] border border-gray-200 shadow-sm">
              <div className="mb-6">
                <p className="text-[11px] text-gray-400 leading-relaxed italic mb-4">
                  Analisis resiko akan diperbarui seiring anda menjawab
                  pertanyaan lebih lanjut.
                </p>
                <div className="h-[1px] bg-gray-100 w-full" />
              </div>

              <h4 className="font-extrabold text-gray-800 mb-6 flex items-center gap-2">
                Panduan Tingkat Resiko
              </h4>

              <div className="space-y-6">
                {/* Item Rendah */}
                <div className="flex items-start gap-4 group">
                  <div className="w-6 h-6 rounded-full border-2 border-green-500 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-green-50 transition-colors">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      Resiko Rendah
                    </p>
                    <p className="text-[12px] text-gray-500 mt-0.5">
                      Kondisi milatif normal.
                    </p>
                  </div>
                </div>

                {/* Item Sedang */}
                <div className="flex items-start gap-4 group">
                  <div className="w-6 h-6 rounded-full border-2 border-orange-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-orange-50 transition-colors">
                    <div className="w-2.5 h-2.5 bg-orange-400 rounded-full" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      Resiko Sedang
                    </p>
                    <p className="text-[12px] text-gray-500 mt-0.5">
                      Butuh perhatian lebih.
                    </p>
                  </div>
                </div>

                {/* Item Tinggi */}
                <div className="flex items-start gap-4 group">
                  <div className="w-6 h-6 rounded-full border-2 border-red-500 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-red-50 transition-colors">
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      Resiko Tinggi
                    </p>
                    <p className="text-[12px] text-gray-500 mt-0.5">
                      Potensi masalah serius.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tombol Ulangi */}
            <button
              onClick={() => navigate("/skrining")}
              className="w-full py-4 bg-white border-2 border-gray-200 text-gray-500 font-bold rounded-[1.5rem] flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95"
            >
              <RefreshCcw size={20} />
              Ulangi Skrining
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HasilSkrining;
