import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./component/sidebar";
import { Search, Trash2, Loader2 } from "lucide-react";

const ManajemenUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
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

  const handleDelete = async (id) => {
    if (window.confirm("Apakah kamu yakin ingin menghapus user ini?")) {
      try {
        await axios.delete(`http://localhost:8000/api/users/${id}`);
        setUsers(users.filter((user) => user.id_user !== id));
      } catch (error) {
        alert("Gagal menghapus user gess.");
      }
    }
  };

  const hitungUmur = (tanggalLahir) => {
    if (!tanggalLahir) return "-";
    const birthDate = new Date(tanggalLahir);
    const today = new Date();

    let umur = today.getFullYear() - birthDate.getFullYear();
    const bulan = today.getMonth() - birthDate.getMonth();

    if (bulan < 0 || (bulan === 0 && today.getDate() < birthDate.getDate())) {
      umur--;
    }

    return umur;
  };

  const filteredUsers = users.filter(
    (user) =>
      user.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFF]">
      <Sidebar />

      <main className="flex-1 p-10">
        <header className="mb-10">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">
            Manajemen Pengguna
          </h2>
          <p className="text-[#60a5fa] font-medium">
            Admin hanya dapat melihat dan menghapus data pengguna.
          </p>
        </header>

        {/* Search */}
        <div className="bg-white p-6 rounded-[30px] shadow-sm border border-blue-50 mb-8">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300"
              size={18}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama atau email user..."
              className="w-full bg-[#F8FAFF] border border-blue-100 rounded-2xl py-3 px-12 focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[40px] shadow-sm border border-blue-50 overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-20 gap-4">
              <Loader2 className="animate-spin text-blue-600" size={40} />
              <p className="text-blue-400 font-bold italic">
                Sabar ya gess, lagi tarik data...
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F8FAFF] border-b border-blue-50">
                <tr>
                  <th className="px-6 py-5 font-bold text-blue-900">Nama</th>
                  <th className="px-6 py-5 font-bold text-blue-900">Email</th>
                  <th className="px-6 py-5 font-bold text-blue-900">JK</th>
                  <th className="px-6 py-5 font-bold text-blue-900">Umur</th>
                  <th className="px-6 py-5 font-bold text-blue-900">Telepon</th>
                  <th className="px-6 py-5 font-bold text-blue-900 text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-50">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id_user} className="hover:bg-blue-50/30">
                      <td className="px-6 py-5 font-bold text-blue-900 flex items-center gap-3">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.nama}`}
                          className="w-9 h-9 rounded-full bg-blue-100"
                          alt="avatar"
                        />
                        {user.nama}
                      </td>
                      <td className="px-6 py-5 text-blue-400">{user.email}</td>
                      <td className="px-6 py-5">{user.jenis_kelamin ?? "-"}</td>
                      <td className="px-6 py-5">
                        {hitungUmur(user.tanggal_lahir)} th
                      </td>
                      <td className="px-6 py-5">{user.telepon ?? "-"}</td>
                      <td className="px-6 py-5 text-center">
                        <button
                          onClick={() => handleDelete(user.id_user)}
                          className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-xl"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
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
