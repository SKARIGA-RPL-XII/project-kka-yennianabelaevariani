import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-white border-b border-gray-100">
      {/* Logo */}
      <div className="flex items-center gap-1">
        <h1 className="text-2xl font-bold text-slate-800">
          Health<span className="text-blue-400">Mate</span>
        </h1>
      </div>

      {/* Menu Items */}
      <div className="flex items-center gap-8">
        <a href="#" className="text-gray-500 hover:text-blue-500 transition">
          Beranda
        </a>
        <a href="#" className="text-gray-500 hover:text-blue-500 transition">
          AI Chatbot
        </a>
        <a href="#" className="text-gray-500 hover:text-blue-500 transition">
          Skrining
        </a>
        <a href="#" className="text-gray-500 hover:text-blue-500 transition">
          Riwayat
        </a>

        {/* Profile */}
        <div className="ml-4 w-10 h-10 rounded-full overflow-hidden border border-gray-200">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
