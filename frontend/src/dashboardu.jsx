import React from "react";
import Navbar from "./component/navbaru";
import dk from "./assets/image/dk.png";
import has from "./assets/image/has.png";
import chat from "./assets/image/chat.png";
import dok from "./assets/image/dok.png";
import tip from "./assets/image/tip.png";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      <main className="mx-auto px-28 py-8">
        {/* Welcome Section */}
        <section className="mb-8">
          <h2 className="text-4xl font-bold text-blue-500">
            Selamat Datang, Je Hoon
          </h2>
          <p className="text-blue-300 mt-1 italic">
            Selamat berkonsultasi semoga anda sehat selalu
          </p>
        </section>

        {/* Top Cards Stats */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          {/* Card 1 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-2 flex items-center gap-8 shadow-sm">
            <div className=" bg-blue-50 rounded-lg flex items-center justify-center text-4xl">
              <img src={chat} alt="" />
            </div>
            <div>
              <h3 className="font-bold text-blue-900 text-2xl">
                Chat dengan AI
              </h3>
              <hr className="text-gray-300 mt-4"></hr>
              <p className="text-blue-400 text-xl mt-4">Konsultasi 5 kali</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-2 flex items-center gap-8 shadow-sm">
            <div className=" bg-blue-50 rounded-lg flex items-center justify-center text-4xl">
              <img src={dk} alt="" />
            </div>
            <div>
              <h3 className="font-bold text-blue-900 text-2xl">
                Skrining Gejala
              </h3>
              <hr className="text-gray-300 mt-4"></hr>
              <p className="text-blue-400 text-xl mt-4">Skrining 2 kali</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-2 flex items-center gap-8 shadow-sm">
            <div className=" bg-blue-50 rounded-lg flex items-center justify-center text-4xl">
              <img src={has} alt="" />
            </div>
            <div>
              <h3 className="font-bold text-blue-900 text-2xl">
                Hasil Konsultasi
              </h3>
              <hr className="text-gray-300 mt-4"></hr>
              <p className="text-blue-400 text-xl mt-4">
                Temuan Resiko{" "}
                <span className="font-bold text-blue-900 text-md">1</span>{" "}
                <span className="text-blue-500 font-semibold">Sedang</span>
              </p>
            </div>
          </div>
        </div>

        {/* Main Banner Section */}
        <div className="bg-blue-50 border-1 border-gray-200 rounded-[40px] pr-9 flex items-center justify-between relative overflow-hidden">
          <div className="flex items-center gap-3">
            {/* Doctor Image Placeholder */}
            <div className="w-118">
              <img
                src={dok}
                alt="Doctor"
                className="rounded-lg object-cover"
              />
            </div>

            <div className="max-w-xl">
              <h2 className="text-6xl font-extrabold text-blue-900 -mt-40 leading-tight mb-6">
                Mulai Konsultasi <br /> Kesehatan Anda
              </h2>
              <p className="text-blue-400 mb-25 leading-relaxed">
                Jawab Pertanyaan dari Skrining kami untuk analisis kesehatan
                awal.
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition shadow-lg shadow-blue-200">
                Mulai Konsultasi
              </button>
            </div>
          </div>

          {/* Sidebar Tips */}
          <div className="bg-white border border-gray-100 rounded-3xl p-7 w-100 shadow-xl ">
            <h4 className="text-blue-900 font-bold mb-4 border-b border-gray-100 pb-2 text-xl mb-6">
              Tips Kesehatan
            </h4>

            <div className="flex flex-col items-center text-center">
              {/* <div className="text-6xl mb-4"></div> */}
              <img src={tip} alt="" />
              <h5 className="font-bold text-blue-900 mb-2 mt-12 text-xl">
                Menjaga imunitas tubuh
              </h5>
              <p className="text-xs text-blue-300 mb-6">
                Tips untuk menjaga daya tahan tubuh agar tetap sehat.
              </p>
              <button className="bg-[#b1E98F] hover:bg-[#a2dc7a] text-white w-full py-2 rounded-xl font-bold transition">
                Baca Tips
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
