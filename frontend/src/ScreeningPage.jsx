import React, { useEffect, useState } from "react";
import Navbar from "./component/navbaru";
import axios from "axios";

const QUESTIONS_PER_PAGE = 5;

const SkriningGejala = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const options = ["Tidak Pernah", "Jarang", "Sering", "Selalu"];

  const skalaMap = {
    "Tidak Pernah": 1,
    Jarang: 2,
    Sering: 3,
    Selalu: 4,
  };

  // 🔥 ambil pertanyaan dari backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pertanyaan")
      .then((res) => {
        setQuestions(res.data);
        setAnswers(Array(res.data.length).fill(null));
      })
      .catch((err) => {
        console.error("Gagal mengambil pertanyaan", err);
      });
  }, []);

  const handleSelect = (qIdx, option) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = option;
    setAnswers(newAnswers);
  };

  const answeredCount = answers.filter((a) => a !== null).length;
  const progress =
    questions.length > 0
      ? Math.round((answeredCount / questions.length) * 100)
      : 0;

  // pagination logic
  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const endIndex = startIndex + QUESTIONS_PER_PAGE;
  const currentQuestions = questions.slice(startIndex, endIndex);
  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

  const canNext = currentQuestions.every(
    (_, idx) => answers[startIndex + idx] !== null,
  );

  // submit
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        user_id: 1,
        jawaban: questions.map((q, idx) => ({
          pertanyaan_id: q.id,
          skala_id: skalaMap[answers[idx]],
        })),
      };

      const res = await axios.post(
        "http://localhost:8000/api/skrining",
        payload,
      );

      alert(
        `Skrining selesai!\nStatus: ${res.data.status}\nSkor: ${res.data.total_skor}`,
      );
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mengirim data skrining");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      <main className="mx-auto px-28 py-8">
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

        <div className="bg-[#eff6ff] rounded-[40px] p-10 shadow-sm">
          {/* progress */}
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

          {/* questions */}
          <div className="space-y-12">
            {currentQuestions.map((q, idx) => {
              const qIdx = startIndex + idx;
              return (
                <div key={q.id} className="space-y-5">
                  <p className="text-[#1e40af] font-bold text-lg">
                    {qIdx + 1}. {q.teks}
                  </p>

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
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                          ${
                            answers[qIdx] === option
                              ? "border-white"
                              : "border-[#dbeafe]"
                          }`}
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
              );
            })}
          </div>

          {/* navigation */}
          <div className="mt-16 flex justify-between items-center">
            <button
              disabled={currentPage === 0}
              onClick={() => setCurrentPage((p) => p - 1)}
              className={`px-8 py-3 rounded-xl font-semibold transition
                ${
                  currentPage === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-white text-[#1e40af] hover:bg-blue-100"
                }`}
            >
              ⬅ Sebelumnya
            </button>

            {currentPage < totalPages - 1 ? (
              <button
                disabled={!canNext}
                onClick={() => setCurrentPage((p) => p + 1)}
                className={`px-8 py-3 rounded-xl font-semibold transition
                  ${
                    !canNext
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#1e40af] text-white hover:bg-blue-800"
                  }`}
              >
                Selanjutnya ➡
              </button>
            ) : (
              <button
                disabled={answeredCount < questions.length || loading}
                onClick={handleSubmit}
                className={`px-12 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl
                  ${
                    answeredCount === questions.length
                      ? "bg-[#1e40af] text-white hover:bg-blue-800 cursor-pointer shadow-blue-200"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }
                `}
              >
                {loading ? "Mengirim..." : "Kirim Analisis"}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SkriningGejala;
