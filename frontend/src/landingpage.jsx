import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dokter from "./assets/image/dokternunjuk.png";
import about from "./assets/image/fotoabout.png";

// Sub-Komponen Navbar (Menerima props isDarkMode)
const Navbar = ({ isDark }) => (
  <nav
    className={`flex justify-between items-center px-6 md:px-20 py-6 sticky top-0 z-50 transition-colors duration-500 border-b ${
      isDark
        ? "bg-[#020817]/80 border-slate-800 backdrop-blur-md"
        : "bg-white/80 border-slate-100 backdrop-blur-md"
    }`}
  >
    <div
      className={`text-3xl font-bold transition-colors ${isDark ? "text-white" : "text-slate-800"}`}
    >
      HealthMate
    </div>
    <div className="hidden md:flex items-center gap-8">
      {["Home", "Fitur", "Tentang Sistem", "FAQ"].map((link) => (
        <a
          key={link}
          href="#"
          className={`text-xl font-medium transition-colors ${
            isDark
              ? "text-slate-300 hover:text-blue-400"
              : "text-slate-600 hover:text-blue-600"
          }`}
        >
          {link}
        </a>
      ))}
      <button className="bg-[#4a90e2] text-white px-8 py-3 rounded-lg hover:bg-blue-500 transition-all hover:shadow-lg ml-4">
        Login
      </button>
      <button
        className={`border px-8 py-3 rounded-lg transition-all ${
          isDark
            ? "border-slate-700 text-white hover:bg-slate-800"
            : "border-[#7fb3d5] text-[#7fb3d5] hover:bg-blue-50"
        }`}
      >
        Register
      </button>
    </div>
  </nav>
);

// Sub-Komponen Feature Card
const FeatureCard = ({ icon, title, desc, delay, isDark }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -10 }}
    className={`flex flex-col items-center text-center max-w-[220px] p-6 rounded-2xl border transition-all duration-500 ${
      isDark
        ? "bg-[#0a1120] border-slate-800 hover:border-blue-500/50 shadow-lg"
        : "bg-white/50 border-white shadow-sm hover:shadow-xl backdrop-blur-sm"
    }`}
  >
    <div
      className={`w-24 h-24 mb-4 flex items-center justify-center rounded-full p-4 transition-colors ${isDark ? "bg-white" : "bg-blue-50"}`}
    >
      <img
        src={`/images/${icon}`}
        alt={title}
        className="w-full h-full object-contain"
      />
    </div>
    <h3
      className={`font-bold text-lg mb-2 transition-colors ${isDark ? "text-white" : "text-[#1e3a8a]"}`}
    >
      {title}
    </h3>
    <p
      className={`text-[11px] leading-relaxed px-2 transition-colors ${isDark ? "text-slate-400" : "text-slate-500"}`}
    >
      {desc}
    </p>
  </motion.div>
);

// Sub-Komponen FAQ
const FAQItem = ({ question, answer, isOpen, onClick, isDark }) => (
  <div
    className={`w-full max-w-3xl border rounded-xl mb-3 shadow-sm overflow-hidden transition-all duration-500 ${
      isDark ? "bg-[#0a1120] border-slate-800" : "bg-white border-slate-100"
    }`}
  >
    <div
      className={`p-4 flex justify-between items-center cursor-pointer transition-colors ${
        isOpen
          ? isDark
            ? "bg-[#111a2e]"
            : "bg-[#f0f7ff]"
          : isDark
            ? "hover:bg-[#111a2e]"
            : "hover:bg-slate-50"
      }`}
      onClick={onClick}
    >
      <span
        className={`font-semibold text-[13px] transition-colors ${isDark ? "text-slate-200" : "text-slate-700"}`}
      >
        {question}
      </span>
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        className={`text-xl ${isDark ? "text-blue-400" : "text-slate-400"}`}
      >
        {isOpen ? "−" : "+"}
      </motion.span>
    </div>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <div
            className={`p-4 text-[12px] border-t transition-colors ${
              isDark
                ? "bg-[#0d172b] text-slate-400 border-slate-800"
                : "bg-[#f0f7ff] text-slate-500 border-slate-200"
            }`}
          >
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// Komponen Utama
const HealthMate = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Default Terang
  const [openFaq, setOpenFaq] = useState(0);

  const faqData = [
    {
      q: "Apa itu sistem konsultasi kesehatan berbasis AI ini?",
      a: "Sistem ini adalah platform kesehatan digital berbasis web yang dirancang untuk membantu pengguna melakukan konsultasi kesehatan awal melalui AI chatbot dan fitur skrining gejala.",
    },
    {
      q: "Bagaimana cara kerja skrining gejala?",
      a: "Sistem menganalisis input gejala yang Anda masukkan dan membandingkannya dengan database medis untuk memberikan kemungkinan diagnosis awal.",
    },
    {
      q: "Apakah data kesehatan saya aman?",
      a: "Ya, kami menggunakan enkripsi end-to-end untuk memastikan semua data medis pribadi Anda tetap terjaga kerahasiaannya.",
    },
    {
      q: "Kapan saya harus berkonsultasi ke tenaga medis profesional?",
      a: "Segera setelah sistem memberikan indikasi gejala serius atau jika Anda merasa kondisi Anda memburuk secara signifikan.",
    },
  ];

  return (
    <div
      className={`min-h-screen font-sans antialiased overflow-x-hidden relative transition-colors duration-500 ${isDarkMode ? "bg-[#020817]" : "bg-[#f8fbff]"}`}
    >
      {/* Tombol Switch Gelap/Terang di Kanan Bawah */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed bottom-8 right-8 z-[100] p-4 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-90 bg-blue-600 text-white"
      >
        {isDarkMode ? (
          <span className="text-xl">☀️</span> // Ikon Matahari untuk balik ke Terang
        ) : (
          <span className="text-xl">🌙</span> // Ikon Bulan untuk ke Gelap
        )}
      </button>

      {/* Background Decor */}
      <div
        className={`absolute top-0 left-0 w-full h-[1000px] -z-10 transition-opacity duration-500 ${isDarkMode ? "opacity-20 bg-gradient-to-b from-blue-900 to-transparent" : "opacity-100 bg-gradient-to-b from-blue-50/50 to-transparent"}`}
      />
      <div
        className={`absolute top-[20%] -right-20 w-96 h-96 rounded-full blur-3xl -z-10 transition-colors duration-500 ${isDarkMode ? "bg-blue-600/10" : "bg-blue-100/30"}`}
      />
      <div
        className={`absolute top-[50%] -left-20 w-96 h-96 rounded-full blur-3xl -z-10 transition-colors duration-500 ${isDarkMode ? "bg-indigo-600/10" : "bg-indigo-100/20"}`}
      />

      <Navbar isDark={isDarkMode} />

      {/* Hero Section */}
      <section className="relative px-10 md:px-35 py-12 flex flex-col md:flex-row items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 z-10"
        >
          <h1
            className={`text-6xl font-bold leading-[1.2] mb-8 transition-colors ${isDarkMode ? "text-white" : "text-slate-800"}`}
          >
            Solusi <span className="text-blue-500">Kesehatan</span> <br />
            <span className="text-blue-500">Digital</span> Untuk Konsultasi{" "}
            <br />
            Awal
          </h1>
          <p
            className={`mb-15 max-w-xl text-xl leading-relaxed transition-colors ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            Sistem berbasis AI untuk membantu skrining gejala dan memberikan
            rekomendasi secara cepat dan aman.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#4a90e2] text-white px-10 py-4 rounded-xl font-semibold shadow-lg hover:bg-blue-600 transition"
          >
            Mulai Konsultasi
          </motion.button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 flex justify-end"
        >
          <img
            src={dokter}
            alt="Doctor Hero"
            className="w-[700px] h-auto object-contain drop-shadow-2xl"
          />
        </motion.div>
      </section>

      {/* Why Trust Us Section */}
      <section className="py-24 px-6 text-center mb-20 relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className={`text-4xl font-bold mb-25 leading-tight transition-colors ${isDarkMode ? "text-white" : "text-[#1e3a8a]"}`}
        >
          Mengapa Anda harus mempercayai <br /> kami? Kenali kami lebih lanjut
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-12 max-w-8xl mx-auto">
          <FeatureCard
            isDark={isDarkMode}
            icon="icon-rekomendasi.png"
            title="Rekomendasi Awal"
            desc="Konsultasi kesehatan awal berbasis AI melalui percakapan interaktif."
            delay={0.1}
          />
          <FeatureCard
            isDark={isDarkMode}
            icon="icon-bot.png"
            title="AI Chatbot"
            desc="Pengumpulan dan analisis gejala kesehatan pengguna secara sistematis."
            delay={0.2}
          />
          <FeatureCard
            isDark={isDarkMode}
            icon="icon-skrining.png"
            title="Skrining Gejala"
            desc="Saran tindakan kesehatan awal berdasarkan hasil analisis sistem."
            delay={0.3}
          />
          <FeatureCard
            isDark={isDarkMode}
            icon="icon-keamanan.png"
            title="Keamanan Data"
            desc="Perlindungan data pengguna dengan sistem keamanan terintegrasi."
            delay={0.4}
          />
        </div>
      </section>

      {/* About Us Section */}
      <section className="relative px-10 md:px-100 py-12 flex gap-40 flex-col md:flex-row items-center justify-between mb-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="md:w-[50%] relative"
        >
          <div
            className={`absolute -inset-4 rounded-full blur-2xl -z-10 transition-colors ${isDarkMode ? "bg-blue-900/20" : "bg-blue-100/50"}`}
          />
          <img
            src={about}
            alt="Doctor About"
            className="w-full relative z-0 drop-shadow-xl rounded-3xl"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="md:w-1/2"
        >
          <h2
            className={`text-5xl font-bold mb-8 -mt-10 transition-colors ${isDarkMode ? "text-white" : "text-slate-800"}`}
          >
            Tentang <span className="text-blue-500">Kami</span>
          </h2>
          <p
            className={`mb-12 text-lg leading-relaxed max-w-md transition-colors ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            Platform kesehatan digital berbasis AI yang membantu konsultasi
            kesehatan awal melalui fitur chatbot, skrining gejala, dan
            rekomendasi tindakan secara terstruktur dan aman.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#4a90e2] text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition"
          >
            Mulai Konsultasi
          </motion.button>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section
        className={`py-24 px-6 flex flex-col items-center transition-colors duration-500 ${isDarkMode ? "bg-[#050b1a]/50" : "bg-white/30 backdrop-blur-sm"}`}
      >
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className={`text-5xl font-bold text-center mb-5 transition-colors ${isDarkMode ? "text-white" : ""}`}
        >
          Pertanyaan yang Sering <span className="text-blue-500">Diajukan</span>
        </motion.h2>
        <p className="text-slate-400 text-center mb-12 max-w-lg text-lg">
          Temukan jawaban atas pertanyaan yang paling sering diajukan.
        </p>
        <div className="w-full flex flex-col items-center">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              isDark={isDarkMode}
              question={item.q}
              answer={item.a}
              isOpen={openFaq === index}
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`border-t px-6 md:px-20 py-10 flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-500 ${
          isDarkMode
            ? "bg-[#020817] border-slate-800"
            : "bg-slate-50 border-slate-100"
        }`}
      >
        <div
          className={`font-bold text-2xl transition-colors ${isDarkMode ? "text-white" : "text-slate-800"}`}
        >
          HealthMate
        </div>
        <div className="flex gap-8 text-sm font-medium">
          {["Home", "Fitur", "Tentang Sistem", "FAQ"].map((link) => (
            <a
              key={link}
              href="#"
              className={`transition-colors ${isDarkMode ? "text-slate-400 hover:text-blue-400" : "text-slate-600 hover:text-blue-500"}`}
            >
              {link}
            </a>
          ))}
        </div>
        <div className="text-xs text-slate-400 text-center">
          Copyright 2026 @ HealthMate
        </div>
      </footer>
    </div>
  );
};

export default HealthMate;
