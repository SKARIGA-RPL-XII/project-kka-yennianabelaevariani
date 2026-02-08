import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Activity } from "lucide-react"; // Tambahkan icon biar modern

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email: email,
        password: password,
      });

      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        // Cek role, jika admin arahkan ke /admin, jika user ke /d
        const targetPath =
          response.data.user.role === "admin" ? "/admin" : "/d";
        navigate(targetPath);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login gagal. Periksa kembali email dan password Anda.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F7FF] flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Dekorasi Background Bulatan Halus (Sama seperti style skrining) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-300/20 rounded-full blur-[120px]" />

      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        {/* SISI KIRI: Branding & Deskripsi */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-[500px] space-y-8 text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-200">
              <Activity className="text-white" size={32} />
            </div>
            <h2 className="text-4xl font-black text-[#1e40af] tracking-tight">
              Health<span className="text-blue-500">Mate</span>
            </h2>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-[1.1]">
              Satu Langkah Menuju{" "}
              <span className="text-blue-600">Hidup Sehat.</span>
            </h1>
            <p className="text-[#60a5fa] text-lg font-medium leading-relaxed">
              Konsultasi kesehatan berbasis AI, skrining gejala akurat, dan
              rekomendasi medis terstruktur dalam satu platform digital.
            </p>
          </div>
        </motion.div>

        {/* SISI KANAN: Card Login */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white p-10 md:p-12 w-full max-w-[480px] relative overflow-hidden"
        >
          <div className="mb-10 text-center">
            <h3 className="text-3xl font-black text-slate-900 mb-2">
              Selamat Datang
            </h3>
            <p className="text-slate-400 font-medium italic">
              Silakan masuk ke akun Anda
            </p>
          </div>

          {/* Pesan Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-100 text-red-500 rounded-2xl text-xs font-bold flex items-center gap-2"
            >
              <span>⚠️</span> {error}
            </motion.div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 ml-2 uppercase tracking-widest">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors"
                  size={20}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#F8FAFF] border border-blue-50 rounded-[1.25rem] py-4 pl-12 pr-6 outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all text-slate-700 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 ml-2 uppercase tracking-widest">
                Password
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors"
                  size={20}
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#F8FAFF] border border-blue-50 rounded-[1.25rem] py-4 pl-12 pr-6 outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all text-slate-700 font-medium"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <a
                href="#"
                className="text-xs font-bold text-blue-500 hover:text-blue-700 transition"
              >
                Lupa Password?
              </a>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center justify-center gap-3 ${
                loading
                  ? "bg-slate-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-black py-4 rounded-[1.25rem] transition-all shadow-xl shadow-blue-100 mt-4 text-lg`}
            >
              {loading ? "Menghubungkan..." : "Masuk Sekarang"}
              {!loading && <ArrowRight size={20} />}
            </motion.button>
          </form>

          <p className="mt-10 text-center text-sm font-medium text-slate-400">
            Belum punya akun HealthMate?{" "}
            <a
              href="/regis"
              className="text-blue-600 font-black hover:underline underline-offset-4"
            >
              Daftar Gratis
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginScreen;
