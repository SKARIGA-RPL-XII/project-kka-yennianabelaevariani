import React from "react";
import Navbar from "./component/navbaru";

const Chatbot = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Memanggil Navbar yang sudah dibuat sebelumnya */}
      <Navbar />

      <main className=" mx-auto px-28 py-8">
        {/* Header Title */}
        <section className="mb-6">
          <h2 className="text-4xl font-bold text-blue-900 mb-2">
            Chatbot Konsultasi AI
          </h2>
          <p className="text-blue-400 mt-1">
            Ajukan pertanyaan mengenai kesehatanmu dan dapatkan informasi awal
            dari Chatbot AI
          </p>
        </section>

        {/* Chat Interface Container */}
        <div className="bg-[#eff6ff] rounded-4xl p-8 flex gap-6 h-[870px]">
          {/* Main Chat Area */}
          <div className="flex-1 bg-white rounded-[25px] p-6 flex flex-col shadow-sm">
            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
              {/* Bot Message 1 */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 flex-shrink-0 bg-blue-50 rounded-full flex items-center justify-center overflow-hidden border border-blue-100">
                  <span className="text-2xl">🤖</span>
                  {/* Ganti dengan <img src="bot-icon.png" /> jika ada asetnya */}
                </div>
                <div className="bg-[#f3f4f6] text-slate-700 p-4 rounded-2xl rounded-tl-none max-w-[70%] text-sm leading-relaxed">
                  Hallo Je Hoon, ada keluhan kesehatan apa yang ingin kamu
                  diskusikan hari ini?
                </div>
              </div>

              {/* User Message */}
              <div className="flex items-start justify-end gap-3">
                <div className="bg-[#dcf0ff] text-slate-700 p-4 rounded-2xl rounded-tr-none max-w-[70%] text-sm leading-relaxed">
                  Hallo Saya udah dua hari merasa lemas, pusing budrek mual dan
                  sakit kepalaaa duh budrek, budrek datang kapan saja, budrek
                  ada obat nya cocok kalo minum panadol
                </div>
                <div className="w-12 h-12 flex-shrink-0 rounded-full overflow-hidden border border-gray-200">
                  <img src="https://via.placeholder.com/48" alt="User" />
                </div>
              </div>

              {/* Bot Message 2 */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 flex-shrink-0 bg-blue-50 rounded-full flex items-center justify-center overflow-hidden border border-blue-100">
                  <span className="text-2xl">🤖</span>
                </div>
                <div className="bg-[#f3f4f6] text-slate-700 p-4 rounded-2xl rounded-tl-none max-w-[70%] text-sm leading-relaxed">
                  Ohhh macemm tu hoon, tenang jeee takpelah tuu, kau niiii kene
                  kuwatttt, lahh tpi aku aka
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
              <input
                type="text"
                placeholder="ishhh aku ni sakitt lah kasi solusi bukan kata penyemangat je"
                className="flex-1 bg-white border border-gray-300 rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              />
              <button className="bg-[#5a93d0] hover:bg-blue-600 text-white w-12 h-12 rounded-xl flex items-center justify-center transition shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 rotate-45"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Sidebar: Riwayat Chatbot */}
          <div className="w-80 bg-white rounded-[25px] p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Riwayat Chatbot
            </h3>
            <div className="space-y-6">
              {/* History Item 1 */}
              <div className="pb-4 border-b border-gray-100">
                <p className="font-bold text-slate-800 text-sm mb-1">
                  2 Hari lalu
                </p>
                <p className="text-xs text-slate-500 line-clamp-2">
                  Hallo Je Hoon, ada keluhan kesehatan apa yang ingin kamu
                  diskusikan hari ini?
                </p>
              </div>

              {/* History Item 2 */}
              <div className="pb-4 border-b border-gray-100">
                <p className="font-bold text-slate-800 text-sm mb-1">
                  28 Januari 2026
                </p>
                <p className="text-xs text-slate-500 line-clamp-2">
                  Hallo Je Hoon, ada keluhan kesehatan apa yang ingin kamu
                  diskusikan hari ini?
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chatbot;
