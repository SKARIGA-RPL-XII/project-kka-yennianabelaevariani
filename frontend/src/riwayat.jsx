import React, { useState } from "react";
import Navbar from "./component/navbaru";

const Riwayat = () => {
  const [activeTab, setActiveTab] = useState("chatbot");

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main className="mx-auto px-28 py-8">
        <h2 className="text-4xl font-bold text-blue-900 mb-2">
          Riwayat Konsultasi
        </h2>
        <p className="text-[#60a5fa] mb-8">
          Lihat Riwayat percakapat chatbot, hasil skrining, dan detail
          konsultasi kesehatan sebelumnya.
        </p>

        <div className="bg-[#eff6ff] rounded-4xl p-8 h-[870px]">
          {/* Tab Navigation */}
          <div className="flex gap-8 mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("chatbot")}
              className={`pb-2 px-1 font-bold text-lg transition-all ${activeTab === "chatbot" ? "text-[#1e40af] border-b-4 border-[#1e40af]" : "text-gray-400"}`}
            >
              Riwayat Chatbot
            </button>
            <button
              onClick={() => setActiveTab("skrining")}
              className={`pb-2 px-1 font-bold text-lg transition-all ${activeTab === "skrining" ? "text-[#1e40af] border-b-4 border-[#1e40af]" : "text-gray-400"}`}
            >
              Riwayat Skrining
            </button>
          </div>

          <div className="flex gap-6">
            {/* List Riwayat */}
            <div className="flex-1 space-y-4">
              {/* Search Bar */}
              <div className="relative mb-6">
                <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 italic">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  Cari riwayat konsultasi....
                </span>
                <input
                  type="text"
                  className="w-full bg-white border border-gray-300 rounded-full py-3 px-12 focus:outline-none"
                />
              </div>

              {/* Item Card (Mapping ini jika data dinamis) */}
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-3xl p-4 flex items-center justify-between shadow-sm border border-gray-50 hover:border-blue-200 transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src="https://via.placeholder.com/50"
                      className="w-12 h-12 rounded-full"
                      alt="User"
                    />
                    <div>
                      <h4 className="font-bold text-slate-800">
                        28 Januari 2026{" "}
                        {activeTab === "chatbot"
                          ? "Sakit Kepala & Mual"
                          : "Skrining Mandiri"}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Hallo Je Hoon, ada keluhan kesehatan apa yang ingin kamu
                        diskusikan hari ini?
                      </p>
                    </div>
                  </div>
                  <img
                    src="https://ui-avatars.com/api/?name=Bot&background=0D8ABC&color=fff"
                    className="w-12 h-12 rounded-full border"
                    alt="Bot"
                  />
                </div>
              ))}
            </div>

            {/* Sidebar Detail */}
            <div className="w-110 bg-white rounded-[25px] p-6 shadow-sm border border-gray-100 flex flex-col">
              <h3 className="font-bold text-slate-800 mb-4">
                Detail Konsultasi
              </h3>
              <hr />
              <div className="flex items-center gap-4 my-6">
                <img
                  src="https://via.placeholder.com/60"
                  className="w-14 h-14 rounded-full"
                  alt="User"
                />
                <span className="font-bold text-lg text-slate-800">
                  Je Hoon
                </span>
              </div>
              <hr />

              <div className="mt-6">
                <div className="bg-orange-50 text-orange-500 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 mb-4 w-fit">
                  <span className="text-lg">🛡️</span> Resiko Sedang
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-8">
                  Analisis resiko akan diperbarui seiring anda menjawab
                  pertanyaan lebih lanjut.
                </p>

                <h4 className="font-bold text-slate-700 mb-4 text-sm">
                  Panduan Tingkat Resiko
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[11px] font-semibold">
                    <span className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center text-green-500">
                      ✓
                    </span>
                    <span className="text-slate-700">Resiko Rendah:</span>{" "}
                    <span className="text-slate-400 font-normal">
                      Kondisi milatif normal.
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-semibold">
                    <span className="w-5 h-5 rounded-full border-2 border-orange-400 flex items-center justify-center text-orange-400">
                      ✓
                    </span>
                    <span className="text-slate-700">Resiko Sedang:</span>{" "}
                    <span className="text-slate-400 font-normal">
                      Butuh perhatian lebih.
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-semibold">
                    <span className="w-5 h-5 rounded-full border-2 border-red-500 flex items-center justify-center text-red-500 font-bold">
                      !
                    </span>
                    <span className="text-slate-700">Resiko Tinggi:</span>{" "}
                    <span className="text-slate-400 font-normal">
                      Potensi masalah serius.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Riwayat;
