import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Mengambil data user dari localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      setUserName(userObj.nama || "User"); // Default ke 'User' jika nama kosong
    }
  }, []);

  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-white border-b border-gray-100 sticky top-0 z-[100]">
      {/* Logo */}
      <Link to="/d" className="flex items-center gap-1">
        <h1 className="text-2xl font-bold text-slate-800">
          Health<span className="text-blue-400">Mate</span>
        </h1>
      </Link>

      {/* Menu Items */}
      <div className="flex items-center gap-8">
        <Link
          to="/d"
          className="text-gray-500 font-medium hover:text-blue-500 transition"
        >
          Beranda
        </Link>
        <Link
          to="/c"
          className="text-gray-500 font-medium hover:text-blue-500 transition"
        >
          AI Chatbot
        </Link>
        <Link
          to="/skriningawal"
          className="text-gray-500 font-medium hover:text-blue-500 transition"
        >
          Skrining
        </Link>
        <Link
          to="/r"
          className="text-gray-500 font-medium hover:text-blue-500 transition"
        >
          Riwayat
        </Link>

        {/* Profile Avatar */}
        <Link
          to="/profile"
          className="ml-4 group flex items-center gap-3 hover:bg-slate-50 p-1 pr-3 rounded-full transition-all border border-transparent hover:border-slate-100"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-100 shadow-sm group-hover:border-blue-400 transition-all">
            <img
              src={`https://ui-avatars.com/api/?name=${userName}&background=0066FF&color=fff&size=128`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 hidden md:block">
            {userName.split(" ")[0]}{" "}
            {/* Menampilkan nama depan saja agar ringkas */}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
