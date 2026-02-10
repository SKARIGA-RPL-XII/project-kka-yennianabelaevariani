import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dokter from "./assets/image/dokternunjuk.png";
import about from "./assets/image/fotoabout.png";
import chat from "./assets/icon/chatbot.png";
import keamanan from "./assets/icon/Keamanan.png";
import skrining from "./assets/icon/Skrining.png";
import rekom from "./assets/icon/rekomendasi.png";

// Sub-Komponen Navbar
const Navbar = ({ isDark }) => {
  const navigate = useNavigate();

  return (
    <nav
      style={{ zIndex: 9999 }}
      className={`flex justify-between items-center px-6 md:px-20 py-5 fixed top-0 left-0 w-full border-b ${
        isDark
          ? "bg-[#020817] border-slate-800"
          : "bg-white border-slate-100 shadow-sm"
      }`}
    >
      <div
        className={`text-2xl font-bold ${isDark ? "text-white" : "text-blue-600"}`}
      >
        HealthMate
      </div>

      <div className="hidden md:flex items-center gap-8">
        {[
          { name: "Beranda", id: "#home" },
          { name: "Fitur", id: "#fitur" },
          { name: "Tentang", id: "#tentang" },
          { name: "FAQ", id: "#faq" },
        ].map((link) => (
          <a
            key={link.name}
            href={link.id}
            className={`font-medium ${
              isDark
                ? "text-slate-300 hover:text-blue-400"
                : "text-slate-600 hover:text-blue-600"
            }`}
          >
            {link.name}
          </a>
        ))}

        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

// Sub-Komponen Feature Card (Statis)
const FeatureCard = ({ icon, title, desc, isDark }) => (
  <div
    className={`flex flex-col items-center text-center max-w-[350px] p-6 rounded-2xl ${
      isDark
        ? "border border-slate-800"
        : "bg-white/50 border border-white shadow-sm"
    }`}
  >
    <div className="w-32 h-32 mb-2 flex items-center justify-center rounded-full p-4">
      <img src={icon} alt={title} className="w-full h-full object-contain" />
    </div>
    <h3
      className={`font-bold text-2xl mb-2 ${isDark ? "text-white" : "text-[#1e3a8a]"}`}
    >
      {title}
    </h3>
    <p
      className={`text-xm leading-relaxed px-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}
    >
      {desc}
    </p>
  </div>
);

// Sub-Komponen FAQ (Statis)
const FAQItem = ({ question, answer, isOpen, onClick, isDark }) => (
  <div
    className={`w-full max-w-5xl border rounded-2xl mb-3 shadow-sm overflow-hidden ${
      isDark ? "bg-[#0a1120] border-slate-800" : "bg-white border-slate-100"
    }`}
  >
    <div
      className={`p-7 flex justify-between items-center cursor-pointer ${
        isOpen ? (isDark ? "bg-[#111a2e]" : "bg-[#f0f7ff]") : ""
      }`}
      onClick={onClick}
    >
      <span
        className={`font-semibold text-xm ${isDark ? "text-slate-200" : "text-slate-500"}`}
      >
        {question}
      </span>
      <span
        className={`text-xl ${isDark ? "text-blue-400" : "text-slate-400"}`}
      >
        {isOpen ? "−" : "+"}
      </span>
    </div>
    {isOpen && (
      <div
        className={`p-6 text-xm border-t ${
          isDark
            ? "bg-[#0d172b] text-slate-400 border-slate-800"
            : "bg-[#f0f7ff] text-slate-500 border-slate-200"
        }`}
      >
        {answer}
      </div>
    )}
  </div>
);

const HealthMate = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const faqData = [
    {
      q: "Apa itu sistem konsultasi kesehatan berbasis AI ini?",
      a: "Sistem ini merupakan platform kesehatan digital berbasis web yang dirancang untuk membantu pengguna melakukan konsultasi kesehatan awal secara mandiri.",
    },
    {
      q: "Bagaimana cara kerja skrining gejala?",
      a: "Skrining gejala dilakukan dengan mengajukan serangkaian pertanyaan terkait kondisi kesehatan yang dirasakan pengguna.",
    },
    {
      q: "Apakah data kesehatan saya aman?",
      a: "Keamanan data pengguna menjadi prioritas utama sistem ini. Seluruh data kesehatan yang dimasukkan akan disimpan secara aman.",
    },
    {
      q: "Kapan saya harus berkonsultasi ke tenaga medis profesional?",
      a: "Pengguna disarankan untuk segera berkonsultasi dengan tenaga medis profesional apabila hasil skrining menunjukkan tingkat risiko sedang hingga tinggi.",
    },
  ];

  return (
    <div
      className={`min-h-screen font-sans antialiased overflow-x-hidden relative ${isDarkMode ? "bg-[#020817]" : "bg-[#f8fbff]"}`}
    >
      {/* Mode Toggle Button */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed bottom-8 right-8 z-[100] p-4 rounded-full shadow-2xl bg-blue-600 text-white"
      >
        {isDarkMode ? "☀️" : "🌙"}
      </button>

      <div
        className={`absolute top-0 left-0 w-full h-[1000px] -z-10 ${isDarkMode ? "opacity-20 bg-gradient-to-b from-blue-900 to-transparent" : "opacity-100 bg-gradient-to-b from-blue-50/50 to-transparent"}`}
      />

      <Navbar isDark={isDarkMode} />

      {/* Hero Section */}
      <section
        id="home"
        className="relative px-10 md:px-35 py-12 pt-32 flex flex-col md:flex-row items-center justify-between"
      >
        <div className="md:w-1/2 z-10">
          <h1
            className={`text-6xl font-bold leading-[1.2] mb-8 ${isDarkMode ? "text-white" : "text-slate-800"}`}
          >
            Solusi <span className="text-blue-500">Kesehatan</span> <br />
            <span className="text-blue-500">Digital</span> Untuk Konsultasi Awal
          </h1>
          <p
            className={`mb-15 max-w-xl text-xl leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            Sistem berbasis AI untuk membantu skrining gejala dan memberikan
            rekomendasi secara cepat dan aman.
          </p>
          <button className="bg-[#4a90e2] text-white px-10 py-4 rounded-xl font-semibold shadow-lg">
            Mulai Konsultasi
          </button>
        </div>
        <div className="md:w-1/2 flex justify-end">
          <img
            src={dokter}
            alt="Doctor Hero"
            className="w-[700px] h-auto object-contain"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="fitur" className="py-10 px-6 text-center mb-20">
        <h2
          className={`text-5xl font-bold mb-28 leading-tight ${isDarkMode ? "text-white" : "text-[#1e3a8a]"}`}
        >
          Mengapa Anda harus mempercayai <br /> kami? Kenali kami lebih lanjut
        </h2>
        <div className="flex flex-wrap justify-center gap-20 max-w-9xl mx-auto">
          <FeatureCard
            isDark={isDarkMode}
            icon={rekom}
            title="Rekomendasi Awal"
            desc="Konsultasi kesehatan awal berbasis AI melalui percakapan interaktif."
          />
          <FeatureCard
            isDark={isDarkMode}
            icon={chat}
            title="AI Chatbot"
            desc="Pengumpulan dan analisis gejala kesehatan pengguna secara sistematis."
          />
          <FeatureCard
            isDark={isDarkMode}
            icon={skrining}
            title="Skrining Gejala"
            desc="Saran tindakan kesehatan awal berdasarkan hasil analisis sistem."
          />
          <FeatureCard
            isDark={isDarkMode}
            icon={keamanan}
            title="Keamanan Data"
            desc="Perlindungan data pengguna dengan sistem keamanan terintegrasi."
          />
        </div>
      </section>

      {/* About Us Section */}
      <section
        id="tentang"
        className="relative px-10 md:px-70 py-12 flex gap-40 flex-col md:flex-row items-center justify-between mb-20"
      >
        <div className="md:w-[60%]">
          <img
            src={about}
            alt="Doctor About"
            className="w-full drop-shadow-xl rounded-xs"
          />
        </div>
        <div className="md:w-1/2">
          <h2
            className={`text-6xl font-bold mb-8 ${isDarkMode ? "text-white" : "text-slate-800"}`}
          >
            Tentang <span className="text-blue-500">Kami</span>
          </h2>
          <p
            className={`mb-10 text-lg leading-relaxed max-w-md ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            Platform kesehatan digital berbasis AI yang membantu konsultasi
            kesehatan awal melalui fitur chatbot, skrining gejala, dan
            rekomendasi tindakan secara terstruktur dan aman.
          </p>
          <button className="bg-[#4a90e2] text-white px-8 py-3 rounded-lg font-semibold shadow-md">
            Mulai Konsultasi
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className={`py-24 px-6 flex flex-col items-center ${isDarkMode ? "bg-[#050b1a]/50" : "bg-white/30"}`}
      >
        <h2
          className={`text-5xl font-bold text-center mb-5 ${isDarkMode ? "text-white" : ""}`}
        >
          Pertanyaan yang Sering <span className="text-blue-500">Diajukan</span>
        </h2>
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
        className={`border-t px-6 md:px-20 py-10 flex flex-col md:flex-row justify-between items-center gap-4 ${isDarkMode ? "bg-[#020817] border-slate-800" : "bg-slate-50 border-slate-100"}`}
      >
        <div
          className={`font-bold text-2xl ${isDarkMode ? "text-white" : "text-slate-800"}`}
        >
          HealthMate
        </div>
        <div className="flex gap-8 text-sm font-medium">
          {["Home", "Fitur", "Tentang Sistem", "FAQ", "Kontak"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
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
