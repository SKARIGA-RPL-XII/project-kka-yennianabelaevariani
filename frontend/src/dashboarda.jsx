import React from "react";
import Sidebar from "./component/sidebar"; // Panggil sidebar tadi gess
import { Search, Bell, ChevronDown, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      label: "Total Pengguna",
      value: "1,250",
      trend: "+25",
      color: "from-teal-400 to-teal-500",
    },
    {
      label: "Jumlah Skrining",
      value: "324",
      trend: "+45",
      color: "from-blue-400 to-blue-500",
    },
    {
      label: "Total Konsultasi",
      value: "1,192",
      trend: "+87",
      color: "from-orange-400 to-orange-500",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFF]">
      <Sidebar />

      <main className="flex-1 p-10">
        {/* Top Header */}
        <header className="flex items-center justify-between mb-10">
          <div className="relative w-96">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300"
              size={18}
            />
            <input
              type="text"
              placeholder="Cari statistik atau data..."
              className="w-full bg-white border border-blue-50 rounded-2xl py-3 px-12 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm italic text-sm"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-blue-400 bg-white rounded-xl shadow-sm border border-blue-50">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-blue-100">
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
            </div>
          </div>
        </header>

        {/* Welcome Section */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">
            Selamat datang, Admin! 👋
          </h2>
          <p className="text-blue-400 font-medium text-lg">
            Ringkasan statistik dan aktivitas terbaru dari sistem hari ini.
          </p>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-8 mb-10">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-[35px] shadow-sm border border-blue-50 relative overflow-hidden group hover:shadow-xl hover:shadow-blue-100 transition-all duration-300"
            >
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-5 -mr-10 -mt-10 rounded-full`}
              ></div>
              <p className="text-blue-400 font-bold mb-4">{item.label}</p>
              <div className="flex items-end justify-between">
                <h3 className="text-4xl font-black text-blue-900">
                  {item.value}{" "}
                  <span className="text-sm font-normal text-blue-300">
                    Orang
                  </span>
                </h3>
                <div className="flex items-center gap-1 text-green-500 text-sm font-bold bg-green-50 px-3 py-1 rounded-full">
                  <TrendingUp size={14} /> {item.trend}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section: Charts & Activities */}
        <div className="grid grid-cols-3 gap-8">
          {/* Main Chart Placeholder */}
          <div className="col-span-2 bg-white p-8 rounded-[40px] shadow-sm border border-blue-50">
            <div className="flex justify-between items-center mb-8">
              <h4 className="font-bold text-blue-900 text-lg">
                Grafik Pengguna Baru
              </h4>
              <select className="bg-blue-50 text-blue-600 text-xs font-bold px-4 py-2 rounded-xl border-none outline-none">
                <option>Minggu Ini</option>
                <option>Bulan Ini</option>
              </select>
            </div>
            {/* Box untuk visualisasi chart */}
            <div className="h-64 w-full bg-gradient-to-t from-blue-50/50 to-transparent rounded-3xl border-b-2 border-dashed border-blue-100 flex items-center justify-center">
              <p className="text-blue-300 italic text-sm">
                Visualisasi Chart (Integrasikan Recharts di sini)
              </p>
            </div>
          </div>

          {/* Activity Logs */}
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-blue-50 flex flex-col">
            <h4 className="font-bold text-blue-900 text-lg mb-6">
              Riwayat Aktivitas
            </h4>
            <div className="space-y-6">
              {[
                {
                  user: "Admin",
                  action: "menambahkan artikel baru",
                  time: "2 jam lalu",
                },
                {
                  user: "Admin",
                  action: "memperbarui skor skrining",
                  time: "5 jam lalu",
                },
                {
                  user: "Admin",
                  action: "menonaktifkan user",
                  time: "1 hari lalu",
                },
              ].map((act, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-xs text-blue-900 leading-relaxed">
                      <span className="font-bold">{act.user}</span> {act.action}
                    </p>
                    <p className="text-[10px] text-blue-300 font-bold mt-1 uppercase">
                      {act.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-auto pt-6 text-center text-blue-500 font-bold text-sm hover:underline">
              Lihat Semua Aktivitas
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
