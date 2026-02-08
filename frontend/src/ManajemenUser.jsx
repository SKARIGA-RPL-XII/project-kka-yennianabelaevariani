import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios gess
import Sidebar from "./component/sidebar";
import {
  Search,
  Trash2,
  ShieldCheck,
  ShieldAlert,
  UserPlus,
  Loader2,
} from "lucide-react";

const ManajemenUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Fetch Data dari Laravel
  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Ganti URL sesuai dengan alamat backend Laravel kamu
      const response = await axios.get("http://localhost:8000/api/users");
      setUsers(response.data.data);
    } catch (error) {
      console.error("Gagal ambil data user:", error);
      alert("Terjadi kesalahan koneksi ke server gess.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 2. Fungsi Delete Terintegrasi API
  const handleDelete = async (id) => {
    if (window.confirm("Apakah kamu yakin ingin menghapus user ini?")) {
      try {
        await axios.delete(`http://localhost:8000/api/users/${id}`);
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        alert("Gagal menghapus user gess.");
      }
    }
  };

  // 3. Fungsi Filter Nama & Email (Client-side search)
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFF]">
      <Sidebar />

      <main className="flex-1 p-10">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-2">
              Manajemen Pengguna
            </h2>
            <p className="text-[#60a5fa] font-medium">
              Kelola data asli dari database HealthMate.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-[#1e40af] text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-800 transition shadow-lg">
            <UserPlus size={18} /> Tambah User
          </button>
        </header>

        {/* Search Bar */}
        <div className="bg-white p-6 rounded-[30px] shadow-sm border border-blue-50 mb-8 flex justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300"
              size={18}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama atau email user...."
              className="w-full bg-[#F8FAFF] border border-blue-100 rounded-2xl py-3 px-12 focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm"
            />
          </div>
        </div>

        {/* User Table Card */}
        <div className="bg-white rounded-[40px] shadow-sm border border-blue-50 overflow-hidden relative">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-20 gap-4">
              <Loader2 className="animate-spin text-blue-600" size={40} />
              <p className="text-blue-400 font-bold italic">
                Sabar ya gess, lagi tarik data...
              </p>
            </div>
          ) : (
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
                    ID
                  </th>
                  <th className="px-8 py-5 text-sm font-bold text-blue-900 text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-50">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
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
                        #{user.id}
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="p-2 text-red-300 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-10 text-slate-400 italic"
                    >
                      User tidak ditemukan gess...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default ManajemenUser;
