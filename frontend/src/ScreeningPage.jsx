import React, { useState } from "react";
import Navbar from "./component/navbaru"; // Menggunakan navbar sesuai contohmu

const SkriningGejala = () => {
  // State untuk menyimpan jawaban (indeks 0-4 untuk 5 pertanyaan)
  const [answers, setAnswers] = useState(Array(5).fill(null));

  const questions = [
    "Apakah Anda merasa sesak napas saat melakukan aktivitas ringan (berjalan, naik tangga)?",
    "Apakah Anda merasa sesak napas saat melakukan aktivitas ringan (berjalan, naik tangga)?",
    "Apakah Anda merasa sesak napas saat melakukan aktivitas ringan (berjalan, naik tangga)?",
    "Apakah Anda merasa sesak napas saat melakukan aktivitas ringan (berjalan, naik tangga)?",
    "Apakah Anda merasa sesak napas saat melakukan aktivitas ringan (berjalan, naik tangga)?",
  ];

  const options = ["Tidak Pernah", "Jarang", "Sering", "Selalu"];

  const handleSelect = (qIdx, option) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = option;
    setAnswers(newAnswers);
  };

  // Menghitung progres berdasarkan jumlah pertanyaan yang sudah dijawab
  const answeredCount = answers.filter((a) => a !== null).length;
  const progress = (answeredCount / questions.length) * 100;

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      <main className="mx-auto px-28 py-8">
        {/* Header Section */}
        <header className="mb-8">
          <h2 className="text-4xl font-bold text-blue-900 mb-2">
            Skrining Gejala
          </h2>
          <p className="text-[#60a5fa] max-w-3xl leading-relaxed">
            Jawab pertanyaan ini dengan keadaan yang sebenarnya, hindari mengisi
            jawaban berdasarkan perkiraan, keinginan, atau mengada-ada agar
            hasil analisis tetap akurat.
          </p>
        </header>

        {/* Form Container */}
        <div className="bg-[#eff6ff] rounded-[40px] p-10 shadow-sm">
          {/* Progress Bar Section */}
          <div className="flex items-center gap-6 mb-12">
            <div className="flex-1 h-5 bg-white rounded-full overflow-hidden p-1 shadow-inner">
              <div
                className="h-full bg-[#3b82f6] rounded-full transition-all duration-500 ease-out shadow-sm"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-[#1e40af] font-bold text-sm min-w-[120px]">
              {progress}% Belum Selesai
            </span>
          </div>

          {/* Questions List */}
          <div className="space-y-12">
            {questions.map((question, qIdx) => (
              <div key={qIdx} className="space-y-5">
                <p className="text-[#1e40af] font-bold text-lg">{question}</p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSelect(qIdx, option)}
                      className={`
                        px-6 py-3 rounded-full border-2 text-sm font-semibold transition-all duration-200
                        flex items-center gap-3
                        ${
                          answers[qIdx] === option
                            ? "bg-[#2563eb] border-[#2563eb] text-white shadow-lg translate-y-[-2px]"
                            : "bg-white border-transparent text-[#60a5fa] hover:border-blue-200"
                        }
                      `}
                    >
                      {/* Custom Radio Circle */}
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                        ${answers[qIdx] === option ? "border-white" : "border-[#dbeafe]"}`}
                      >
                        {answers[qIdx] === option && (
                          <div className="w-2.5 h-2.5 bg-white rounded-full" />
                        )}
                      </div>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Action */}
          <div className="mt-16 flex justify-end">
            <button
              disabled={answeredCount < questions.length}
              className={`px-12 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl
                ${
                  answeredCount === questions.length
                    ? "bg-[#1e40af] text-white hover:bg-blue-800 cursor-pointer shadow-blue-200"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
              `}
            >
              Kirim Analisis
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SkriningGejala;
