import React, { useState, useEffect } from "react";
import Navbar from "./component/navbaru";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Calendar,
  ChevronRight,
  LogOut,
  Camera,
} from "lucide-react";

const Profile = () => {
  const [userData, setUserData] = useState({
    nama: "",
    email: "",
    tanggal_lahir: "",
    telepon: "",
    jenis_kelamin: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Mengambil data user dari localStorage (sesuai cara LoginScreen menyimpan data)
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    const userObj = JSON.parse(storedUser);
    const userId = userObj.id_user; // Pastikan Laravel mengirim 'id_user'

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/users/${userId}`,
        );
        if (response.data.success) {
          setUserData(response.data.data);
        }
      } catch (err) {
        setError("Gagal memuat profil.");
      } finally {
        setFetching(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const userId = JSON.parse(localStorage.getItem("user")).id_user;
      const response = await axios.put(
        `http://localhost:8000/api/users/${userId}`,
        userData,
      );

      if (response.data.success) {
        setMessage("Profil berhasil diperbarui secara aman!");
        // Update data di localStorage agar nama di Navbar juga berubah
        const updatedLocal = {
          ...JSON.parse(localStorage.getItem("user")),
          nama: userData.nama,
        };
        localStorage.setItem("user", JSON.stringify(updatedLocal));

        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan update.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (fetching)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F7FF]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFF] font-sans text-slate-800 relative overflow-hidden">
      {/* Background Decor sama dengan Login */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/20 rounded-full blur-[120px]" />

      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-[#1e40af] tracking-tight">
              Profil Pengguna
            </h2>
            <p className="text-slate-400 font-medium">
              Kelola informasi akun HealthMate Anda
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-500 rounded-2xl font-bold hover:bg-red-100 transition-all border border-red-100 w-fit"
          >
            <LogOut size={18} /> Keluar Akun
          </button>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Card Kiri: Ringkasan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-white flex flex-col items-center text-center"
          >
            <div className="relative group mb-6">
              <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center shadow-2xl shadow-blue-200 overflow-hidden">
                <img
                  src={`https://ui-avatars.com/api/?name=${userData.nama}&background=random&color=fff&size=128`}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg border border-slate-100 text-blue-600">
                <Camera size={20} />
              </div>
            </div>

            <h3 className="text-2xl font-black text-slate-900 leading-tight">
              {userData.nama}
            </h3>
            <p className="text-blue-500 font-bold mb-6">{userData.email}</p>

            <div className="w-full pt-6 border-t border-slate-50 space-y-3 text-left">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-medium">Status</span>
                <span className="text-green-500 font-bold bg-green-50 px-3 py-1 rounded-full text-[10px] uppercase">
                  Aktif
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-medium">Member Sejak</span>
                <span className="text-slate-700 font-bold">2026</span>
              </div>
            </div>
          </motion.div>

          {/* Card Kanan: Form Edit */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-white"
          >
            {message && (
              <div className="mb-8 p-4 bg-blue-50 border border-blue-100 text-blue-600 rounded-2xl text-sm font-bold flex items-center gap-2 italic">
                <span>✨</span> {message}
              </div>
            )}

            <form
              onSubmit={handleUpdate}
              className="grid md:grid-cols-2 gap-x-8 gap-y-6"
            >
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 ml-2 uppercase tracking-widest">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                    size={20}
                  />
                  <input
                    name="nama"
                    value={userData.nama}
                    onChange={handleChange}
                    className="input-modern"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 ml-2 uppercase tracking-widest">
                  Alamat Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                    size={20}
                  />
                  <input
                    value={userData.email}
                    disabled
                    className="input-modern bg-slate-50 opacity-60 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 ml-2 uppercase tracking-widest">
                  Tanggal Lahir
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                    size={20}
                  />
                  <input
                    type="date"
                    name="tanggal_lahir"
                    value={userData.tanggal_lahir}
                    onChange={handleChange}
                    className="input-modern"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 ml-2 uppercase tracking-widest">
                  Nomor Telepon
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                    size={20}
                  />
                  <input
                    name="telepon"
                    value={userData.telepon}
                    onChange={handleChange}
                    className="input-modern"
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-3">
                <label className="text-xs font-bold text-slate-400 ml-2 uppercase tracking-widest">
                  Jenis Kelamin
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {["Laki-laki", "Perempuan"].map((option) => (
                    <label
                      key={option}
                      className={`flex items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all font-bold ${userData.jenis_kelamin === option ? "border-blue-500 bg-blue-50 text-blue-600" : "border-slate-50 bg-slate-50 text-slate-400"}`}
                    >
                      <input
                        type="radio"
                        name="jenis_kelamin"
                        value={option}
                        checked={userData.jenis_kelamin === option}
                        onChange={handleChange}
                        className="hidden"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 pt-6">
                <button
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-3xl transition-all shadow-xl shadow-blue-100 text-lg"
                >
                  {loading ? "Menyimpan..." : "Simpan Perubahan"}
                  {!loading && <ChevronRight size={22} />}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>

      <style jsx="true">{`
        .input-modern {
          width: 100%;
          padding: 1rem 1.25rem 1rem 3.5rem;
          background-color: #f8faff;
          border: 1px solid #e2e8f0;
          border-radius: 1.25rem;
          outline: none;
          transition: all 0.3s;
          font-weight: 600;
          color: #334155;
        }
        .input-modern:focus {
          border-color: #3b82f6;
          background-color: white;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.05);
        }
      `}</style>
    </div>
  );
};

export default Profile;
