// src/style/tema.jsx

export const getTheme = (isDark) => {
  return {
    // Warna Global Halaman
    // bodyBg: isDark ? "bg-[#020817]" : "bg-[#f8fbff]",
    // authBg: isDark ? "bg-[#020817]" : "bg-[#D1E3F4]", // Khusus Login & Register
    // textTitle: isDark ? "text-white" : "text-slate-800",
    // textDesc: isDark ? "text-slate-400" : "text-slate-500",

    // // Navbar
    // nav: isDark
    //   ? "bg-[#020817]/80 border-slate-800 text-slate-300"
    //   : "bg-white/80 border-slate-100 text-slate-600",

    // // Kartu (Feature, FAQ, Auth Card)
    // card: isDark
    //   ? "bg-[#0a1120] border-slate-800 shadow-lg"
    //   : "bg-white/80 border-white shadow-sm",

    // // Input Form (Login/Register)
    // input: isDark
    //   ? "bg-[#111a2e] border-slate-700 text-white placeholder-slate-500"
    //   : "bg-[#E8F1F9] border-[#B8D4EE] text-slate-700 placeholder-slate-400",

    // // Tombol Utama
    // buttonPrimary: "bg-[#4a90e2] hover:bg-blue-600 text-white",
    // buttonAuth: "bg-[#5D99D2] hover:bg-[#4A88C1] text-white",

    // // Dekorasi (Branding Box di Register/Login)
    // brandingBox: isDark
    //   ? "border-blue-500 bg-blue-900/10"
    //   : "border-blue-500 bg-transparent",
    bg: isDarkMode ? "bg-[#020817]" : "bg-[#D1E3F4]",
    card: isDarkMode
      ? "bg-[#0a1120] border-slate-800"
      : "bg-white/80 border-white",
    input: isDarkMode
      ? "bg-[#111a2e] border-slate-700 text-white"
      : "bg-[#E8F1F9] border-[#B8D4EE] text-slate-400",
    textTitle: isDarkMode ? "text-white" : "text-[#001B3D]",
    textLabel: isDarkMode ? "text-slate-300" : "text-slate-700",
    brandingText: isDarkMode ? "text-slate-400" : "text-[#001B3D]",
  };
};
