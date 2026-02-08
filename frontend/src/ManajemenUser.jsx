import React, { useState } from "react";
import Sidebar from "./component/sidebar";
import {
  Search,
  Bell,
  Trash2,
  ShieldCheck,
  ShieldAlert,
  UserPlus,
} from "lucide-react";

const ManajemenUser = () => {
  // Data dummy user agar terlihat nyata gess
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Je Hoon",
      email: "jehoon@gmail.com",
      role: "User",
      status: "Aktif",
      joined: "28 Jan 2026",
    },
    {
      id: 2,
      name: "Adit",
      email: "adit@gmail.com",
      role: "User",
      status: "Nonaktif",
      joined: "01 Feb 2026",
    },
    {
      id: 3,
      name: "Sarah",
      email: "sarah.w@gmail.com",
      role: "User",
      status: "Aktif",
      joined: "05 Feb 2026",
    },
    {
      id: 4,
      name: "Budi",
      email: "budi.santoso@gmail.com",
      role: "User",
      status: "Aktif",
      joined: "07 Feb 2026",
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Apakah kamu yakin ingin menghapus user ini?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Aktif" ? "Nonaktif" : "Aktif" }
          : user,
      ),
    );
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFF]">
      {/* Sidebar dipanggil di sini gess */}
      <Sidebar />

      <main className="flex-1 p-10">
        {/* Header Section */}
        <header className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-2">
              Manajemen Pengguna
            </h2>
            <p className="text-[#60a5fa] font-medium">
              Kelola hak akses, pantau status, dan hapus akun pengguna sistem.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-[#1e40af] text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-800 transition shadow-lg shadow-blue-100">
              <UserPlus size={18} /> Tambah User
            </button>
          </div>
        </header>

        {/* Search & Filter Bar */}
        <div className="bg-white p-6 rounded-[30px] shadow-sm border border-blue-50 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300"
              size={18}
            />
            <input
              type="text"
              placeholder="Cari nama atau email user...."
              className="w-full bg-[#F8FAFF] border border-blue-100 rounded-2xl py-3 px-12 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-sm"
            />
          </div>
          <div className="flex gap-3">
            <select className="bg-[#F8FAFF] text-blue-900 font-bold text-xs px-4 py-3 rounded-xl border border-blue-100 outline-none">
              <option>Semua Status</option>
              <option>Aktif</option>
              <option>Nonaktif</option>
            </select>
          </div>
        </div>

        {/* User Table Card */}
        <div className="bg-white rounded-[40px] shadow-sm border border-blue-50 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#F8FAFF] border-b border-blue-50">
              <tr>
                <th className="px-8 py-5 text-sm font-bold text-blue-900">
                  Nama Pengguna
                </th>
                <th className="px-8 py-5 text-sm font-bold text-blue-900">
                  Email
                </th>
                <th className="px-8 py-5 text-sm font-bold text-blue-900">
                  Tanggal Bergabung
                </th>
                <th className="px-8 py-5 text-sm font-bold text-blue-900">
                  Status
                </th>
                <th className="px-8 py-5 text-sm font-bold text-blue-900 text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-blue-50/30 transition-colors"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                        className="w-10 h-10 rounded-full bg-blue-100"
                        alt="Avatar"
                      />
                      <span className="font-bold text-blue-900">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-[#60a5fa] font-medium">
                    {user.email}
                  </td>
                  <td className="px-8 py-5 text-sm text-blue-900 font-semibold">
                    {user.joined}
                  </td>
                  <td className="px-8 py-5">
                    <button
                      onClick={() => toggleStatus(user.id)}
                      className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                        user.status === "Aktif"
                          ? "bg-green-50 text-green-500 border border-green-100"
                          : "bg-red-50 text-red-500 border border-red-100"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${user.status === "Aktif" ? "bg-green-500" : "bg-red-500"}`}
                      ></div>
                      {user.status}
                    </button>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => toggleStatus(user.id)}
                        className="p-2 text-blue-400 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
                        title={
                          user.status === "Aktif"
                            ? "Nonaktifkan Akun"
                            : "Aktifkan Akun"
                        }
                      >
                        {user.status === "Aktif" ? (
                          <ShieldAlert size={20} />
                        ) : (
                          <ShieldCheck size={20} />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-red-300 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all"
                        title="Hapus User"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Footer */}
          <div className="p-6 bg-[#F8FAFF] border-t border-blue-50 flex justify-between items-center px-8">
            <p className="text-xs text-[#60a5fa] font-bold">
              Menampilkan {users.length} dari 120 User
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-blue-100 rounded-xl text-xs font-bold text-blue-900 hover:bg-blue-100 transition">
                Sebelumnya
              </button>
              <button className="px-4 py-2 bg-[#1e40af] text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition shadow-md shadow-blue-50">
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManajemenUser;
