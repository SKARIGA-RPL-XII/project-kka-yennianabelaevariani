import React from "react";
import { motion } from "framer-motion";

const SignUpScreen = () => {
  return (
    <div className="min-h-screen bg-[#D1E3F4] flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24">
        {/* KIRI: Form Sign Up dengan Animasi */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-white/50 w-full max-w-[500px]"
        >
          <h1 className="text-4xl font-bold mb-8 text-slate-900">
            Sign <span className="text-[#3B82F6]">Up</span>
          </h1>

          <form className="space-y-4">
            {/* Grid untuk First & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  First Name
                </label>
                <input
                  type="text"
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
                  placeholder="Evariani"
                  className="input-style"
                />
              </div>
            </div>

            {/* Grid untuk Birth & Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  Birth of Date
                </label>
                <input
                  type="text"
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
                placeholder="............"
                className="input-style"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#5A94C9] hover:bg-[#4A83B8] text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg mt-4"
            >
              Sign Up
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Sudah punya akun?{" "}
            <a href="/login" className="text-[#3B82F6] font-bold hover:underline">
              Log In
            </a>
          </p>
        </motion.div>

        {/* KANAN: Deskripsi HealthMate (Rata Tengah) */}
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
            chatbot, skrining gejala, dan rekomendasi tindakan kesehatan secara
            terstruktur dan mudah digunakan.
          </p>
        </motion.div>
      </div>

      {/* CSS Khusus untuk Reusability */}
      <style jsx>{`
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
