import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpScreen = () => {
  // 1. State untuk semua input
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

  // 2. Handle perubahan input secara dinamis
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 3. Fungsi Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Menggabungkan nama untuk dikirim ke kolom 'name' di Laravel
    const fullName = `${formData.firstName} ${formData.lastName}`;

    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        name: fullName,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password, // Laravel butuh konfirmasi jika pakai breeze/sanctum
        // Tambahkan field di bawah jika database kamu sudah mendukungnya:
        // phone: formData.phone,
        // birth_date: formData.birthDate
      });

      if (response.status === 201 || response.status === 200) {
        alert("Registrasi Berhasil! Silahkan Login.");
        navigate("/login");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registrasi gagal. Email mungkin sudah digunakan.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#D1E3F4] flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24">
        {/* KIRI: Form Sign Up */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-white/50 w-full max-w-[500px]"
        >
          <h1 className="text-4xl font-bold mb-8 text-slate-900">
            Sign <span className="text-[#3B82F6]">Up</span>
          </h1>

          {/* Pesan Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm italic">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Yenni Anabela"
                  className="input-style"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Evariani"
                  className="input-style"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  Birth of Date
                </label>
                <input
                  type="text"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  placeholder="28/01/2008"
                  className="input-style"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  No. Handphone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="081368864796"
                  className="input-style"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="yennianabela016@gmail.com"
                className="input-style"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                minLength="8"
                value={formData.password}
                onChange={handleChange}
                placeholder="............"
                className="input-style"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full ${loading ? "bg-gray-400" : "bg-[#5A94C9] hover:bg-[#4A83B8]"} text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg mt-4`}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Sudah punya akun?{" "}
            <a
              href="/login"
              className="text-[#3B82F6] font-bold hover:underline"
            >
              Log In
            </a>
          </p>
        </motion.div>

        {/* KANAN: Deskripsi */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-[450px] text-center space-y-6"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
            Health<span className="text-[#003B95]">Mate</span>
          </h2>
          <p className="text-slate-800 leading-relaxed text-base md:text-lg font-medium opacity-90">
            HealthMate adalah platform kesehatan digital berbasis web yang
            membantu pengguna melakukan konsultasi kesehatan awal melalui AI
            chatbot...
          </p>
        </motion.div>
      </div>

      <style jsx="true">{`
        .input-style {
          width: 100%;
          padding: 0.75rem 1rem;
          background-color: #e8f1f9;
          border: 1.5px solid #a5c7e9;
          border-radius: 0.75rem;
          outline: none;
          transition: all 0.2s;
          color: #64748b;
        }
        .input-style:focus {
          border-color: #3b82f6;
          background-color: #fff;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }
      `}</style>
    </div>
  );
};

export default SignUpScreen;
