import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./component/navbaru"; 
import SA from "./assets/image/sa.png";

const SkriningAwal = () => {
    const navigate = useNavigate();
  const infoCards = [
    { label: "Jenis Skrining:", value: "Skrining Gejala Kesehatan" },
    { label: "Jumlah Pertanyaan:", value: "35 Pertanyaan" },
    { label: "Durasi:", value: "Estimasi 5-10 Menit" },
  ];

  const guidelines = [
    "Skrining ini membantu kamu mengenali kondisi kesehatan awal berdasarkan gejala yang dirasakan.",
    "Tidak ada jawaban benar atau salah, jawablah sesuai kondisi yang kamu alami agar hasil lebih akurat.",
    "Hasil skrining bersifat informasi awal, bukan diagnosis medis resmi.",
    "Gunakan hasil skrining sebagai panduan untuk menentukan langkah selanjutnya.",
    "Jika hasil menunjukkan risiko tertentu atau keluhan berlanjut, sangat disarankan untuk berkonsultasi langsung dengan tenaga medis profesional.",
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      <main className="mx-auto px-28 py-12 flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold text-[#1e40af] mb-4">
            Skrining Kesehatan Awal
          </h2>
          <p className="text-[#60a5fa] text-lg">
            Kenali kondisi kesehatan awalmu untuk menentukan langkah terbaik
            menjaga kesehatan ✨
          </p>
        </div>

        {/* Info Cards Row */}
        <div className="flex gap-6 mb-12 w-full max-w-5xl justify-center">
          {infoCards.map((card, index) => (
            <div
              key={index}
              className="flex-1 bg-white border border-blue-100 rounded-[30px] p-6 shadow-sm flex flex-col items-center justify-center text-center"
            >
              <span className="text-[#60a5fa] text-sm font-medium mb-1">
                {card.label}
              </span>
              <span className="text-[#1e40af] font-bold text-lg">
                {card.value}
              </span>
            </div>
          ))}
        </div>

        {/* Instruction Box */}
        <div className="bg-[#f0f7ff] rounded-[40px] p-12 w-full max-w-5xl relative overflow-hidden shadow-sm border border-blue-50">
          <h3 className="text-[#1e40af] font-bold text-xl text-center mb-10 flex items-center justify-center gap-2">
            📌 Sebelum memulai skrining, perhatikan hal berikut ini:
          </h3>

          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left Side: Illustration */}
            <div className="w-full md:w-2/5 flex justify-center">
              <div className="relative">
                {/* Gunakan gambar ilustrasi dokumen/checklist. 
                  Saya menggunakan placeholder yang menyerupai bentuk di gambar.
                */}
                <img
                  src={SA}
                  alt="Illustration"
                  className="w-72 h-72 object-contain"
                />
              </div>
            </div>

            {/* Right Side: List */}
            <div className="w-full md:w-3/5">
              <ol className="space-y-4">
                {guidelines.map((text, idx) => (
                  <li
                    key={idx}
                    className="flex gap-4 text-[#60a5fa] leading-relaxed"
                  >
                    <span className="font-bold text-[#60a5fa]">{idx + 1}.</span>
                    <p className="text-justify text-sm md:text-base">{text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-12 pt-8 border-t border-blue-100">
            <p className="text-center text-[#60a5fa] italic text-sm opacity-80">
              Sistem ini dirancang sebagai alat bantu edukasi kesehatan dan
              tidak menggantikan peran dokter.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/skrining")}
          className="mt-10 px-12 py-4 bg-[#1e40af] text-white font-bold rounded-2xl hover:bg-blue-800 transition active:scale-95 shadow-xl shadow-blue-100"
        >
          Mulai Skrining Sekarang
        </button>   
      </main>
    </div>
  );
};

export default SkriningAwal;
