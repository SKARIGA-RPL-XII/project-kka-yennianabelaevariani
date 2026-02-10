import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Pastikan AnimatePresence diimport
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  ArrowRight,
  Activity,
  Sparkles,
  Eye,
  EyeOff,
} from "lucide-react"; // Tambah Eye & EyeOff

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State untuk toggle mata
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
        const targetPath =
          response.data.user.role === "admin" ? "/dasboard" : "/d";
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
    <div className="min-h-screen bg-[#fcfdff] flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[120px]" />

      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
        {/* Sisi Kiri: Branding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-[550px] space-y-10 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-md border border-blue-50 rounded-2xl shadow-sm">
            <Activity className="text-blue-600" size={24} />
            <span className="text-sm font-bold text-blue-900 tracking-wide uppercase">
              AI-Health Platform
            </span>
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.05] tracking-tight">
              Akses Masa Depan <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                Kesehatan Anda.
              </span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-[480px]">
              Masuk untuk memantau kesehatan dengan cerdas, konsultasi AI, dan
              data medis yang terorganisir.
            </p>
          </div>
        </motion.div>

        {/* Sisi Kanan: Login Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-[500px]"
        >
          <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border border-white p-8 md:p-12 relative">
            <div className="mb-10">
              <h3 className="text-3xl font-bold text-slate-900 mb-2">
                Welcome Back
              </h3>
              <p className="text-slate-400 font-medium">
                Lanjutkan perjalanan sehatmu bersama HealthMate.
              </p>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-semibold flex items-center gap-3">
                    <span>⚠️</span> {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form className="space-y-6" onSubmit={handleLogin}>
              {/* Input Email */}
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-400 ml-1 uppercase tracking-widest">
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
                    placeholder="name@company.com"
                    className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] transition-all text-slate-700 font-medium"
                  />
                </div>
              </div>

              {/* Input Password dengan Icon Mata */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[13px] font-bold text-slate-400 ml-1 uppercase tracking-widest">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-[13px] font-bold text-blue-600 hover:text-indigo-600 transition"
                  >
                    Lupa Password?
                  </a>
                </div>
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors"
                    size={20}
                  />

                  <input
                    type={showPassword ? "text" : "password"} // Dinamis: text atau password
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-14 outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] transition-all text-slate-700 font-medium"
                  />

                  {/* TOMBOL MATA */}
                  <button
                    type="button" // Penting: type button agar tidak trigger submit form
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all ${
                  loading
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200"
                }`}
              >
                {loading ? "Menghubungkan..." : "Sign In"}
                {!loading && <ArrowRight size={20} />}
              </motion.button>
            </form>

            <div className="mt-10 pt-8 border-t border-slate-50 text-center">
              <p className="text-slate-400 font-medium">
                Belum punya akun?{" "}
                <a
                  href="/regis"
                  className="text-blue-600 font-bold hover:underline underline-offset-4"
                >
                  Daftar Gratis
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginScreen;
