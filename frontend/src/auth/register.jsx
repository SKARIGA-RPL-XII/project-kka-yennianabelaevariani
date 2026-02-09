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
  Users, // Icon tambahan untuk Jenis Kelamin
} from "lucide-react";

const SignUpScreen = () => {
  const [formData, setFormData] = useState({
    nama: "", // Sesuaikan dengan database (bukan name)
    birthDate: "",
    phone: "",
    email: "",
    password: "",
    jenis_kelamin: "", // Kolom baru sesuai gambar
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

    try {
      // Sesuaikan key JSON dengan field di database Laravel kamu
      const response = await axios.post("http://localhost:8000/api/register", {
        nama: formData.nama,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password,
        telepon: formData.phone,
        tanggal_lahir: formData.birthDate,
        jenis_kelamin: formData.jenis_kelamin,
        role: "user", // Default role
      });

      if (response.status === 201 || response.status === 200) {
        alert("Registrasi Berhasil! Silakan Login.");
        navigate("/login");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registrasi gagal. Pastikan data benar (Email unik & Password min 8 karakter).",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F7FF] flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Dekorasi Background */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-300/20 rounded-full blur-[120px]" />

      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        {/* SISI KIRI: Branding */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
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
            <p className="text-[#60a5fa] text-lg font-medium">
              Daftar sekarang untuk mendapatkan akses penuh ke konsultasi AI dan
              pemantauan kesehatan pribadimu.
            </p>
          </div>
        </motion.div>

        {/* SISI KANAN: Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[3rem] shadow-xl border border-white p-8 md:p-10 w-full max-w-[550px]"
        >
          <div className="mb-8 text-center md:text-left">
            <h3 className="text-3xl font-black text-slate-900 mb-2">
              Buat Akun
            </h3>
            <p className="text-slate-400 font-medium italic text-sm">
              Lengkapi data diri Anda sesuai skema terbaru
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-500 rounded-2xl text-xs font-bold flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleRegister}>
            {/* Nama Lengkap */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 ml-2 uppercase tracking-widest">
                Nama Lengkap
              </label>
              <div className="relative group">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors"
                  size={18}
                />
                <input
                  type="text"
                  name="nama"
                  required
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  className="w-full bg-[#F8FAFF] border border-blue-50 rounded-[1.25rem] py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-100 text-sm font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Birth Date */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 ml-2 uppercase tracking-widest">
                  Tanggal Lahir
                </label>
                <div className="relative group">
                  <Calendar
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors"
                    size={18}
                  />
                  <input
                    type="date" // Gunakan type date biar user enak milihnya gess
                    name="birthDate"
                    required
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="w-full bg-[#F8FAFF] border border-blue-50 rounded-[1.25rem] py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-100 text-sm font-medium"
                  />
                </div>
              </div>

              {/* Jenis Kelamin */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 ml-2 uppercase tracking-widest">
                  Jenis Kelamin
                </label>
                <div className="relative group">
                  <Users
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors"
                    size={18}
                  />
                  <select
                    name="jenis_kelamin"
                    required
                    value={formData.jenis_kelamin}
                    onChange={handleChange}
                    className="w-full bg-[#F8FAFF] border border-blue-50 rounded-[1.25rem] py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-100 text-sm font-medium appearance-none cursor-pointer"
                  >
                    <option value="">Pilih...</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 ml-2 uppercase tracking-widest">
                  Nomor Telepon
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
                    placeholder="08..."
                    className="w-full bg-[#F8FAFF] border border-blue-50 rounded-[1.25rem] py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-100 text-sm font-medium"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 ml-2 uppercase tracking-widest">
                  Email
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
                    placeholder="name@mail.com"
                    className="w-full bg-[#F8FAFF] border border-blue-50 rounded-[1.25rem] py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-100 text-sm font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 ml-2 uppercase tracking-widest">
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
                  className="w-full bg-[#F8FAFF] border border-blue-50 rounded-[1.25rem] py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-100 text-sm font-medium"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full flex items-center justify-center gap-3 ${
                loading ? "bg-slate-300" : "bg-blue-600 hover:bg-blue-700"
              } text-white font-black py-4 rounded-[1.25rem] transition-all shadow-xl mt-6`}
            >
              {loading ? "Mendaftarkan Akun..." : "Buat Akun Sekarang"}
              {!loading && <ArrowRight size={18} />}
            </motion.button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-slate-400">
            Sudah punya akun HealthMate?{" "}
            <a
              href="/login"
              className="text-blue-600 font-black hover:underline"
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
