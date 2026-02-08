import React from "react";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", active: true },
    { icon: <Users size={20} />, label: "Manajemen Pengguna", active: false },
    {
      icon: <ClipboardList size={20} />,
      label: "Manajemen Skrining",
      active: false,
    },
    {
      icon: <FileText size={20} />,
      label: "Pengelolaan Artikel",
      active: false,
    },
    { icon: <Settings size={20} />, label: "Pengaturan Sistem", active: false },
  ];

  return (
    <aside className="w-72 min-h-screen bg-white border-r border-blue-50 flex flex-col p-6 sticky top-0">
      {/* Logo Section */}
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
          <span className="text-white font-bold text-xl">H</span>
        </div>
        <h1 className="text-2xl font-bold text-blue-900">
          Health<span className="text-blue-500">Mate</span>
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-semibold transition-all duration-200 ${
              item.active
                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md shadow-blue-100"
                : "text-blue-400 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <button className="flex items-center gap-4 px-4 py-3.5 mt-auto text-red-400 font-semibold hover:bg-red-50 rounded-2xl transition-all">
        <LogOut size={20} />
        <span className="text-sm">Keluar</span>
      </button>
    </aside>
  );
};

export default Sidebar;
