import React from "react";
import Navbar from "./component/navbaru";
import {
  Search,
  ArrowRight,
  AlertCircle,
  Flame,
  Droplets,
  Info,
  Phone,
} from "lucide-react";
import dk from "./assets/image/dk.png";
import has from "./assets/image/has.png";
import chat from "./assets/image/chat.png";
import dok from "./assets/image/dok.png";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      <main className="mx-auto px-28 py-8">
        {/* Welcome Section */}
        <section className="mb-8">
          <h2 className="text-4xl font-bold text-blue-500">
            Selamat Datang, Je Hoon
          </h2>
          <p className="text-blue-300 mt-1 italic">
            Dashboard informasi kesehatan anda hari ini.
          </p>
        </section>

        {/* Top Cards Stats - Informatif Tanpa Data Backend */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 flex items-center gap-6 shadow-sm hover:shadow-md transition-all">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center p-3">
              <img src={chat} alt="Chat AI" />
            </div>
            <div>
              <h3 className="font-bold text-blue-900 text-lg">Chat AI</h3>
              <p className="text-blue-400 text-xs">Konsultasi cepat 24 jam.</p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-6 flex items-center gap-6 shadow-sm hover:shadow-md transition-all">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center p-3">
              <img src={dk} alt="Skrining" />
            </div>
            <div>
              <h3 className="font-bold text-blue-900 text-lg">Cek Gejala</h3>
              <p className="text-blue-400 text-xs">
                Analisis risiko kesehatan awal.
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-6 flex items-center gap-6 shadow-sm hover:shadow-md transition-all">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center p-3">
              <img src={has} alt="Hasil" />
            </div>
            <div>
              <h3 className="font-bold text-blue-900 text-lg">Hasil Medis</h3>
              <p className="text-blue-400 text-xs">
                Akses semua riwayat skrining.
              </p>
            </div>
          </div>
        </div>

        {/* Main Section: Banner & P3K Info */}
        <div className="flex gap-8 items-stretch">
          {/* Banner Utama */}
          <div className="flex-[1.8] bg-blue-50 rounded-[50px] p-12 flex items-center justify-between relative overflow-hidden border border-blue-100">
            <div className="z-10 max-w-sm">
              <h2 className="text-5xl font-black text-blue-900 leading-[1.1] mb-6">
                Butuh Solusi <br /> Kesehatan?
              </h2>
              <p className="text-blue-400 text-lg mb-10 leading-relaxed font-medium">
                Gunakan layanan skrining pintar kami untuk panduan medis
                pertama.
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold transition shadow-xl shadow-blue-200 flex items-center gap-3 group">
                Mulai Skrining{" "}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>

            <div className="w-96 absolute right-0 bottom-0 translate-y-4 pointer-events-none opacity-90">
              <img src={dok} alt="Doctor" className="w-full" />
            </div>
          </div>

          {/* Kolom Kanan: Panduan Penanganan Cepat (Pengganti Tips Imun) */}
          <div className="flex-1 bg-white border border-gray-100 rounded-[40px] p-8 shadow-xl shadow-blue-50/40 flex flex-col">
            <h4 className="text-blue-900 font-bold mb-6 border-b border-gray-50 pb-4 text-xl flex items-center gap-2">
              <AlertCircle className="text-red-500" size={24} /> Penanganan
              Cepat
            </h4>

            <div className="space-y-4 flex-1">
              {/* Info 1: Memar/Jatuh */}
              <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 group hover:bg-orange-100 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white rounded-lg text-orange-500 shadow-sm">
                    <Droplets size={16} />
                  </div>
                  <h5 className="font-bold text-blue-900 text-sm">
                    Memar & Jatuh
                  </h5>
                </div>
                <p className="text-[11px] text-blue-400 leading-relaxed font-medium">
                  Gunakan metode <b>RICE</b> (Rest, Ice, Compression,
                  Elevation). Kompres dingin selama 15 menit.
                </p>
              </div>

              {/* Info 2: Luka Bakar Ringan */}
              <div className="bg-red-50 p-4 rounded-2xl border border-red-100 group hover:bg-red-100 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white rounded-lg text-red-500 shadow-sm">
                    <Flame size={16} />
                  </div>
                  <h5 className="font-bold text-blue-900 text-sm">
                    Luka Bakar Ringan
                  </h5>
                </div>
                <p className="text-[11px] text-blue-400 leading-relaxed font-medium">
                  Alirkan air suhu ruang selama 20 menit. Hindari mengoleskan
                  odol, mentega, atau es batu.
                </p>
              </div>

              {/* Info 3: Demam Ringan */}
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 group hover:bg-blue-100 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white rounded-lg text-blue-500 shadow-sm">
                    <Info size={16} />
                  </div>
                  <h5 className="font-bold text-blue-900 text-sm">
                    Demam Ringan
                  </h5>
                </div>
                <p className="text-[11px] text-blue-400 leading-relaxed font-medium">
                  Minum banyak air putih, kompres air hangat di lipatan ketiak,
                  dan istirahat total.
                </p>
              </div>
            </div>

            {/* Emergency Contact Shortcut */}
            <div className="mt-6 flex items-center justify-between p-4 bg-gray-900 rounded-3xl text-white">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-red-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Ambulans
                </span>
              </div>
              <span className="font-black text-lg">119</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
  