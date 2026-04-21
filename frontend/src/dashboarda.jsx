import React, { useState } from "react";
import Sidebar from "./component/sidebar";
import {
  Search,
  Bell,
  ChevronDown,
  BookOpen,
  Activity,
  AlertCircle,
  Lightbulb,
  PhoneCall,
  Phone,
  HeartPulse,
  Stethoscope,
} from "lucide-react";

const AdminDashboard = () => {
  // --- STATE UNTUK TIPS SEHAT (Interaktif Front-End Only) ---
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const allHealthTips = [
    {
      text: '"Minum air putih minimal 2 liter sehari dapat meningkatkan konsentrasi dan metabolisme tubuh hingga 30%."',
      icon: (
        <Lightbulb className="absolute -right-2 -bottom-2 w-24 h-24 text-white/10" />
      ),
    },
    {
      text: '"Jalan kaki ringan selama 30 menit setiap hari dapat membantu menjaga kesehatan jantung dan menurunkan risiko stroke."',
      icon: (
        <Activity className="absolute -right-2 -bottom-2 w-24 h-24 text-white/10" />
      ),
    },
    {
      text: '"Konsumsi sayuran berdaun hijau gelap secara teratur dapat meningkatkan asupan zat besi dan vitamin K."',
      icon: (
        <HeartPulse className="absolute -right-2 -bottom-2 w-24 h-24 text-white/10" />
      ),
    },
  ];

  const updateTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % allHealthTips.length);
  };

  const currentTip = allHealthTips[currentTipIndex];

  return (
    <div className="flex min-h-screen bg-[#F8FAFF]">
      <Sidebar />

      <main className="flex-1 p-10">
        {/* --- Header --- */}
        <header className="flex items-center justify-between mb-10">
          <div className="relative w-96">
            {/* <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300"
              size={18}
            /> */}
            {/* <input
              type="text"
              placeholder="Cari referensi medis..."
              className="w-full bg-white border border-blue-50 rounded-2xl py-3 px-12 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm italic text-sm"
            /> */}
          </div>

          <div className="flex items-center gap-6">
            {/* <button className="relative p-2 text-blue-400 bg-white rounded-xl shadow-sm border border-blue-50">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button> */}
            {/* <div className="flex items-center gap-3 pl-6 border-l border-blue-100">
              <div className="text-right">
                <p className="text-sm font-bold text-blue-900">Administrator</p>
                <p className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider">
                  Super Admin
                </p>
              </div>
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-50"
                alt="Profile"
              />
              <ChevronDown size={16} className="text-blue-300" />
            </div> */}
          </div>
        </header>

        {/* --- Welcome Section --- */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">
            Panel Edukasi HealthMate
          </h2>
          <p className="text-blue-400 font-medium text-lg">
            Referensi kesehatan statis untuk panduan admin hari ini.
          </p>
        </section>

        {/* --- Grid Utama (3 Kolom) --- */}
        <div className="grid grid-cols-3 gap-8 mb-10">
          {/* Kolom 1: Tips Sehat (Interaktif) */}
          <div className="bg-teal-500 p-8 rounded-[40px] shadow-lg shadow-teal-100 text-white relative overflow-hidden flex flex-col justify-between min-h-[300px]">
            {currentTip.icon}
            <div>
              <h4 className="font-bold text-xl mb-4">Tips Sehat</h4>
              <p className="text-sm leading-relaxed font-medium mb-6">
                {currentTip.text}
              </p>
            </div>
            <button
              onClick={updateTip}
              className="self-start text-[10px] bg-white text-teal-600 font-black px-4 py-2 rounded-xl uppercase hover:bg-teal-50 transition-colors shadow-sm"
            >
              Ganti Tips
            </button>
          </div>

          {/* Kolom 2: Panduan P3K Cepat */}
          <div className="bg-gradient-to-br from-rose-500 to-red-600 p-8 rounded-[40px] shadow-lg shadow-red-100 text-white relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10">
              <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                <AlertCircle size={22} /> Panduan P3K
              </h4>
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                  <p className="text-[10px] font-black uppercase tracking-wider opacity-80 mb-1">
                    Luka Bakar
                  </p>
                  <p className="text-xs font-medium">
                    Siram dengan air mengalir 20 menit. Hindari odol/mentega.
                  </p>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                  <p className="text-[10px] font-black uppercase tracking-wider opacity-80 mb-1">
                    Mimisan
                  </p>
                  <p className="text-xs font-medium">
                    Duduk tegak, condongkan tubuh ke depan, jepit hidung 10
                    menit.
                  </p>
                </div>
              </div>
            </div>
            <Stethoscope className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10" />
          </div>

          {/* Kolom 3: Kontak Darurat */}
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-blue-50 flex flex-col">
            <h4 className="font-bold text-blue-900 text-xl mb-6 flex items-center gap-2">
              <PhoneCall size={22} className="text-blue-500" /> Kontak Darurat
            </h4>
            <div className="space-y-4 flex-1">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <div>
                  <p className="text-[10px] font-bold text-blue-400 uppercase">
                    Ambulans
                  </p>
                  <p className="text-base font-black text-blue-900">
                    118 / 119
                  </p>
                </div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-500 shadow-sm">
                  <Phone size={18} />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <div>
                  <p className="text-[10px] font-bold text-blue-400 uppercase">
                    Hotline Kemenkes
                  </p>
                  <p className="text-base font-black text-blue-900">1500-567</p>
                </div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-500 shadow-sm">
                  <Phone size={18} />
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-900 rounded-2xl text-center">
              <p className="text-[10px] font-bold text-white uppercase tracking-widest">
                Layanan 24 Jam
              </p>
            </div>
          </div>
        </div>

        {/* --- Bagian Bawah: Glosarium (Full Width) --- */}
        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-blue-50">
          <div className="flex justify-between items-center mb-8">
            <h4 className="font-bold text-blue-900 text-xl flex items-center gap-2">
              <BookOpen size={24} className="text-blue-500" /> Glosarium Medis
              Sederhana
            </h4>
            <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
              Data Statis
            </span>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-50 hover:bg-white hover:shadow-md transition-all group">
              <h5 className="text-base font-bold text-blue-900 group-hover:text-blue-600">
                Anemia
              </h5>
              <p className="text-sm text-blue-500 mt-2 leading-relaxed">
                Kondisi ketika tubuh kekurangan sel darah merah yang sehat untuk
                mengalirkan oksigen.
              </p>
            </div>
            <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-50 hover:bg-white hover:shadow-md transition-all group">
              <h5 className="text-base font-bold text-blue-900 group-hover:text-blue-600">
                Hipertensi
              </h5>
              <p className="text-sm text-blue-500 mt-2 leading-relaxed">
                Kondisi medis kronis di mana tekanan darah di arteri meningkat
                secara persisten.
              </p>
            </div>
            <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-50 hover:bg-white hover:shadow-md transition-all group">
              <h5 className="text-base font-bold text-blue-900 group-hover:text-blue-600">
                Kolesterol
              </h5>
              <p className="text-sm text-blue-500 mt-2 leading-relaxed">
                Lemak yang diproduksi oleh tubuh dan ditemukan di makanan
                hewani, penting dalam kadar normal.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
