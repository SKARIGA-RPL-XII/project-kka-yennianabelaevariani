import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./component/sidebar";
import { Search, Trash2, Loader2, CheckSquare, Square, X } from "lucide-react"; // Tambah X untuk icon close jika perlu
import { motion, AnimatePresence } from "framer-motion"; // Tambahkan motion agar smooth seperti profil

const ManajemenUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  // State untuk pesan notifikasi (seperti di Profile)
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/users");
      setUsers(response.data.data);
    } catch (err) {
      console.error("Gagal ambil data user:", err);
      setError("Terjadi kesalahan koneksi ke server gess.");
      setTimeout(() => setError(""), 3000);
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
        setSelectedUsers(selectedUsers.filter((item) => item !== id));
        setMessage("User berhasil dihapus dengan aman!");
        setTimeout(() => setMessage(""), 3000);
      } catch (err) {
        setError("Gagal menghapus user gess.");
        setTimeout(() => setError(""), 3000);
      }
    }
  };

  const handleBulkDelete = async () => {
    if (
      window.confirm(
        `Yakin mau hapus ${selectedUsers.length} user yang dipilih?`,
      )
    ) {
      try {
        await Promise.all(
          selectedUsers.map((id) =>
            axios.delete(`http://localhost:8000/api/users/${id}`),
          ),
        );

        setUsers(users.filter((user) => !selectedUsers.includes(user.id_user)));
        setSelectedUsers([]);
        setMessage(
          `Berhasil menghapus ${selectedUsers.length} user secara massal! ✨`,
        );
        setTimeout(() => setMessage(""), 3000);
      } catch (err) {
        setError("Gagal menghapus beberapa user gess.");
        setTimeout(() => setError(""), 3000);
      }
    }
  };

  const handleSelectUser = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((item) => item !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const toggleSelectAll = () => {
    if (
      selectedUsers.length === filteredUsers.length &&
      filteredUsers.length !== 0
    ) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id_user));
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

      <main className="flex-1 p-10 relative">
        {/* Notifikasi Message (Style dari Profile) */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-10 right-10 z-50 p-4 bg-green-50 border border-green-100 text-green-600 rounded-2xl text-sm font-bold flex items-center gap-2 italic shadow-lg"
            >
              <span>✨</span> {message}
            </motion.div>
          )}

          {/* Notifikasi Error (Style dari Profile) */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-10 right-10 z-50 p-4 bg-red-50 border border-red-100 text-red-500 rounded-2xl text-sm font-bold flex items-center gap-2 italic shadow-lg"
            >
              <span>⚠️</span> {error}
            </motion.div>
          )}
        </AnimatePresence>

        <header className="mb-10 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-black text-[#1e40af] tracking-tight mb-2">
              Manajemen Pengguna
            </h2>
            <p className="text-slate-400 font-medium">
              Admin hanya dapat melihat dan menghapus data pengguna HealthMate.
            </p>
          </div>

          {selectedUsers.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl shadow-lg shadow-red-100 transition-all text-sm font-bold"
            >
              <Trash2 size={18} />
              Hapus {selectedUsers.length} User
            </button>
          )}
        </header>

        {/* Search */}
        <div className="bg-white p-6 rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-white mb-8">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
              size={18}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama atau email user..."
              className="w-full bg-[#F8FAFF] border border-slate-100 rounded-2xl py-3 px-12 focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm font-semibold text-slate-600 transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-white overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-20 gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"
              />
              <p className="text-blue-400 font-bold italic">
                Sabar ya gess, lagi tarik data...
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F8FAFF] border-b border-slate-50">
                <tr>
                  <th className="px-6 py-5 w-12 text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded-lg border-slate-200 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      checked={
                        filteredUsers.length > 0 &&
                        selectedUsers.length === filteredUsers.length
                      }
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-5 font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Nama
                  </th>
                  <th className="px-6 py-5 font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Email
                  </th>
                  <th className="px-6 py-5 font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    JK
                  </th>
                  <th className="px-6 py-5 font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Umur
                  </th>
                  <th className="px-6 py-5 font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Telepon
                  </th>
                  <th className="px-6 py-5 font-bold text-slate-900 uppercase tracking-wider text-[11px] text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id_user}
                      className={`hover:bg-blue-50/30 transition-colors ${selectedUsers.includes(user.id_user) ? "bg-blue-50/50" : ""}`}
                    >
                      <td className="px-6 py-5 text-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded-lg border-slate-200 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          checked={selectedUsers.includes(user.id_user)}
                          onChange={() => handleSelectUser(user.id_user)}
                        />
                      </td>
                      <td className="px-6 py-5 font-bold text-slate-800 flex items-center gap-3">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.nama}`}
                          className="w-9 h-9 rounded-xl bg-blue-100 shadow-sm"
                          alt="avatar"
                        />
                        {user.nama}
                      </td>
                      <td className="px-6 py-5 text-blue-500 font-medium">
                        {user.email}
                      </td>
                      <td className="px-6 py-5 text-slate-600 font-medium">
                        {user.jenis_kelamin ?? "-"}
                      </td>
                      <td className="px-6 py-5 text-slate-600 font-medium">
                        {hitungUmur(user.tanggal_lahir)} th
                      </td>
                      <td className="px-6 py-5 text-slate-600 font-medium">
                        {user.telepon ?? "-"}
                      </td>
                      <td className="px-6 py-5 text-center">
                        <button
                          onClick={() => handleDelete(user.id_user)}
                          className="p-2 text-red-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-20 text-slate-400 italic font-medium"
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
