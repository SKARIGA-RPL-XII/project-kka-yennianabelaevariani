import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Users,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

const SignUpScreen = () => {
  const [formData, setFormData] = useState({
    nama: "",
    birthDate: "",
    phone: "",
    email: "",
    password: "",
    jenis_kelamin: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // VALIDASI NAMA: Hanya boleh huruf dan spasi
    if (name === "nama") {
      const lettersOnly = value.replace(/[^a-zA-Z\s]/g, "");
      setFormData((prev) => ({ ...prev, [name]: lettersOnly }));
      return;
    }

    // VALIDASI TELEPON: Hanya boleh angka
    if (name === "phone") {
      const numbersOnly = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({ ...prev, [name]: numbersOnly }));
      return;
    }

    // Default untuk field lainnya
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        nama: formData.nama,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password,
        telepon: formData.phone,
        tanggal_lahir: formData.birthDate,
        jenis_kelamin: formData.jenis_kelamin,
        role: "user",
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
    <div className="min-h-screen bg-[#fcfdff] flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[120px]" />

      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
        {/* --- LEFT SIDE: BRANDING --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-[500px] space-y-10 hidden lg:block"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-md border border-blue-50 rounded-2xl shadow-sm">
            <Activity className="text-blue-600" size={24} />
            <span className="text-sm font-bold text-blue-900 tracking-wide uppercase">
              Join Community
            </span>
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.05] tracking-tight">
              Mulai Hidup <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                Lebih Sehat.
              </span>
            </h1>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              Daftar sekarang untuk mendapatkan akses penuh ke konsultasi AI dan
              pemantauan kesehatan pribadimu secara real-time.
            </p>
          </div>

          <div className="flex items-center gap-6 opacity-60">
            <div className="flex items-center gap-2 font-bold text-slate-400">
              <Sparkles size={18} /> Free Access
            </div>
            <div className="flex items-center gap-2 font-bold text-slate-400">
              <Users size={18} /> 10k+ Users
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT SIDE: FORM CARD --- */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-[600px]"
        >
          <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border border-white p-8 md:p-12 relative">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-slate-900 mb-2">
                Buat Akun Baru
              </h3>
              <p className="text-slate-400 font-medium">
                Lengkapi data diri Anda untuk memulai.
              </p>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-semibold flex items-center gap-3">
                    <span className="flex-shrink-0">⚠️</span> {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form className="space-y-5" onSubmit={handleRegister}>
              {/* Nama Lengkap - Huruf Saja */}
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-400 ml-1 uppercase tracking-widest">
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
                    placeholder="Nama lengkap Anda"
                    className="w-full bg-white border border-slate-100 rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] transition-all text-slate-700 font-medium"
                  />
                </div>
              </div>

              {/* Grid: Tanggal Lahir & Jenis Kelamin */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-slate-400 ml-1 uppercase tracking-widest">
                    Tanggal Lahir
                  </label>
                  <div className="relative group">
                    <Calendar
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors"
                      size={18}
                    />
                    <input
                      type="date"
                      name="birthDate"
                      required
                      value={formData.birthDate}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-100 rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-blue-500 transition-all text-slate-700 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-slate-400 ml-1 uppercase tracking-widest">
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
                      className="w-full bg-white border border-slate-100 rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-blue-500 transition-all text-slate-700 font-medium appearance-none cursor-pointer"
                    >
                      <option value="">Pilih...</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Grid: Phone & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-slate-400 ml-1 uppercase tracking-widest">
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
                      required
                      inputMode="numeric"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="08..."
                      className="w-full bg-white border border-slate-100 rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-blue-500 transition-all text-slate-700 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-slate-400 ml-1 uppercase tracking-widest">
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
                      className="w-full bg-white border border-slate-100 rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-blue-500 transition-all text-slate-700 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Password dengan Fitur Mata */}
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-400 ml-1 uppercase tracking-widest">
                  Password
                </label>
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors"
                    size={18}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    minLength="8"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min. 8 Karakter"
                    className="w-full bg-white border border-slate-100 rounded-2xl py-3.5 pl-11 pr-12 outline-none focus:border-blue-500 transition-all text-slate-700 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all mt-4 ${
                  loading
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200"
                }`}
              >
                {loading ? "Mendaftarkan..." : "Buat Akun Sekarang"}
                {!loading && <ArrowRight size={20} />}
              </motion.button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-50 text-center">
              <p className="text-slate-400 font-medium text-sm">
                Sudah punya akun?{" "}
                <a
                  href="/login"
                  className="text-blue-600 font-bold hover:text-indigo-600 transition underline underline-offset-4"
                >
                  Log In Disini
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpScreen;
