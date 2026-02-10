import React from "react";
import Sidebar from "./component/sidebar";
import {
  Search,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from "lucide-react";
// Import komponen chart
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

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

  // Data untuk Grafik Pengguna Baru (Line Chart)
  const lineData = [
    { name: "apayw", 2020: 60, 2021: 95, 2022: 40 },
    { name: "ok", 2020: 80, 2021: 95, 2022: 90 },
    { name: "wk", 2020: 15, 2021: 65, 2022: 50 },
    { name: "uhuy", 2020: 10, 2021: 65, 2022: 45 },
    { name: "uyy", 2020: 60, 2021: 40, 2022: 10 },
    { name: "a", 2020: 65, 2021: 45, 2022: 90 },
  ];

  // Data untuk Resiko (Pie Chart / Donut Chart)
  const pieData = [
    {
      name: "Resiko Rendah",
      value: 40,
      color: "#22C55E",
      icon: <CheckCircle2 size={16} className="text-green-500" />,
    },
    {
      name: "Resiko Sedang",
      value: 30,
      color: "#FACC15",
      icon: <AlertCircle size={16} className="text-yellow-500" />,
    },
    {
      name: "Resiko Tinggi",
      value: 30,
      color: "#EF4444",
      icon: <XCircle size={16} className="text-red-500" />,
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
            <div className="flex items-center gap-3 pl-6 border-l border-blue-100"></div>
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

        {/* --- BAGIAN CHART (START) --- */}
        <div className="grid grid-cols-3 gap-8">
          {/* Line Chart Section */}
          <div className="col-span-2 bg-white p-8 rounded-[35px] shadow-sm border border-blue-50">
            <h4 className="text-xl font-bold text-blue-900 mb-8">
              Grafik Pengguna Baru
            </h4>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#F1F5F9"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94A3B8", fontSize: 10 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94A3B8", fontSize: 10 }}
                  />
                  <Tooltip />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                  />
                  <Line
                    type="monotone"
                    dataKey="2020"
                    stroke="#4ADE80"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="2021"
                    stroke="#FACC15"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="2022"
                    stroke="#F87171"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart Section */}
          <div className="bg-white p-8 rounded-[35px] shadow-sm border border-blue-50 flex flex-col items-center">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Legend */}
            <div className="w-full space-y-4 mt-4">
              {pieData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-sm font-bold text-blue-900">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-slate-400">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* --- BAGIAN CHART (END) --- */}
      </main>
    </div>
  );
};

export default AdminDashboard;
