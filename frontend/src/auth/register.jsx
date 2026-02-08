import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  ArrowRight,
  Activity,
} from "lucide-react";

const SignUpScreen = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    phone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const fullName = `${formData.firstName} ${formData.lastName}`;

    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        name: fullName,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password,
      });

      if (response.status === 201 || response.status === 200) {
        alert("Registrasi Berhasil! Silakan Login.");
        navigate("/login");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registrasi gagal. Coba lagi nanti.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F7FF] flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Dekorasi Background Halus */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-300/20 rounded-full blur-[120px]" />

      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        {/* SISI KIRI: Branding & Greeting */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-[450px] space-y-8 hidden md:block"
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
            <h1 className="text-5xl font-bold text-slate-900 leading-[1.1]">
              Ayo Bergabung Bersama <span className="text-blue-600">Kami.</span>
            </h1>
            <p className="text-[#60a5fa] text-lg font-medium leading-relaxed">
              Daftar sekarang untuk mendapatkan akses penuh ke konsultasi AI dan
              pemantauan kesehatan pribadimu.
            </p>
          </div>
        </motion.div>

        {/* SISI KANAN: Form Sign Up Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white p-8 md:p-10 w-full max-w-[550px]"
        >
          <div className="mb-8 text-center md:text-left">
            <h3 className="text-3xl font-black text-slate-900 mb-2">
              Buat Akun
            </h3>
            <p className="text-slate-400 font-medium italic text-sm">
              Lengkapi data diri Anda di bawah ini
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-500 rounded-2xl text-xs font-bold flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleRegister}>
            {/* Row 1: Names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 ml-2 uppercase tracking-[0.15em]">
                  First Name
                </label>
                <div className="relative group">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors"
                    size={18}
                  />
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Contoh: Yenni"
                    className="w-full bg-[#F8FAFF] border border-blue-50 rounded-[1.25rem] py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-100 transition-all text-sm font-medium"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 ml-2 uppercase tracking-[0.15em]">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Evariani"
                  className="w-full bg-[#F8FAFF] border border-blue-50 rounded-[1.25rem] py-3.5 px-6 outline-none focus:ring-2 focus:ring-blue-100 transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Row 2: Birth & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 ml-2 uppercase tracking-[0.15em]">
                  Birth Date
                </label>
                <div className="relative group">
                  <Calendar
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors"
                    size={18}
                  />
                  <input
                    type="text"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    placeholder="DD/MM/YYYY"
                    className="w-full bg-[#F8FAFF] border border-blue-50 rounded-[1.25rem] py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-100 transition-all text-sm font-medium"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 ml-2 uppercase tracking-[0.15em]">
                  Phone Number
                </label>
                <div className="relative group">
                  <Phone
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors"
                    size={18}
                  />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0812..."
                    className="w-full bg-[#F8FAFF] border border-blue-50 rounded-[1.25rem] py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-100 transition-all text-sm font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 ml-2 uppercase tracking-[0.15em]">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors"
                  size={18}
                />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full bg-[#F8FAFF] border border-blue-50 rounded-[1.25rem] py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-100 transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Row 4: Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 ml-2 uppercase tracking-[0.15em]">
                Password
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors"
                  size={18}
                />
                <input
                  type="password"
                  name="password"
                  required
                  minLength="8"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 8 Karakter"
                  className="w-full bg-[#F8FAFF] border border-blue-50 rounded-[1.25rem] py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-100 transition-all text-sm font-medium"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full flex items-center justify-center gap-3 ${
                loading
                  ? "bg-slate-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 shadow-blue-100"
              } text-white font-black py-4 rounded-[1.25rem] transition-all shadow-xl mt-6 text-base`}
            >
              {loading ? "Mendaftarkan Akun..." : "Buat Akun Sekarang"}
              {!loading && <ArrowRight size={18} />}
            </motion.button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-slate-400">
            Sudah punya akun HealthMate?{" "}
            <a
              href="/login"
              className="text-blue-600 font-black hover:underline underline-offset-4"
            >
              Log In Disini
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpScreen;
