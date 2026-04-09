import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./component/sidebar";
import {
  Search,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Loader2,
} from "lucide-react";
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
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);

  // Fungsi untuk mengambil data dinamis dari backend
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Sesuaikan URL ini dengan endpoint API Laravel kamu gess
      const response = await axios.get(
        "http://localhost:8000/api/admin/dashboard-stats",
      );
      const { stats, userGrowth, riskDistribution } = response.data;

      // Mapping warna gradient untuk kartu statistik
      const mappedStats = stats.map((item, idx) => {
        const colors = [
          "from-teal-400 to-teal-500",
          "from-blue-400 to-blue-500",
          "from-orange-400 to-orange-500",
        ];
        return { ...item, color: colors[idx] || "from-blue-400 to-blue-500" };
      });

      setStatsData(mappedStats);
      setLineData(userGrowth);

      // Mapping data resiko untuk Pie Chart beserta icon pendukungnya
      const mappedRisk = riskDistribution.map((item) => {
        let config = {
          color: "#22C55E",
          icon: <CheckCircle2 size={16} className="text-green-500" />,
        };

        if (item.name.toLowerCase().includes("sedang")) {
          config = {
            color: "#FACC15",
            icon: <AlertCircle size={16} className="text-yellow-500" />,
          };
        } else if (item.name.toLowerCase().includes("tinggi")) {
          config = {
            color: "#EF4444",
            icon: <XCircle size={16} className="text-red-500" />,
          };
        }

        return { ...item, ...config };
      });

      setPieData(mappedRisk);
    } catch (error) {
      console.error("Gagal load data dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#F8FAFF]">
        <Sidebar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
          <p className="text-blue-400 font-bold italic">
            Sabar gess, lagi tarik data asli...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFF]">
      <Sidebar />

      <main className="flex-1 p-10">
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
        </header>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">
            Selamat datang, Admin! 👋
          </h2>
          <p className="text-blue-400 font-medium text-lg">
            Ringkasan statistik dan aktivitas terbaru dari sistem hari ini.
          </p>
        </section>

        {/* Stats Grid Dinamis */}
        <div className="grid grid-cols-3 gap-8 mb-10">
          {statsData.map((item, idx) => (
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
                  {item.value.toLocaleString()}{" "}
                  <span className="text-sm font-normal text-blue-300">
                    {item.unit || "Data"}
                  </span>
                </h3>
                <div className="flex items-center gap-1 text-green-500 text-sm font-bold bg-green-50 px-3 py-1 rounded-full">
                  <TrendingUp size={14} /> {item.trend}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Line Chart Dinamis */}
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
                  <Tooltip
                    contentStyle={{
                      borderRadius: "20px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                  />
                  {lineData.length > 0 &&
                    Object.keys(lineData[0])
                      .filter((k) => k !== "name")
                      .map((key, i) => (
                        <Line
                          key={key}
                          type="monotone"
                          dataKey={key}
                          stroke={
                            i === 0
                              ? "#4ADE80"
                              : i === 1
                                ? "#FACC15"
                                : "#F87171"
                          }
                          strokeWidth={3}
                          dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                          activeDot={{ r: 6 }}
                        />
                      ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart Dinamis */}
          <div className="bg-white p-8 rounded-[35px] shadow-sm border border-blue-50 flex flex-col items-center">
            <h4 className="text-lg font-bold text-blue-900 mb-4 w-full text-left">
              Distribusi Risiko
            </h4>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        cornerRadius={10}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: "15px", border: "none" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

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
      </main>
    </div>
  );
};

export default AdminDashboard;
