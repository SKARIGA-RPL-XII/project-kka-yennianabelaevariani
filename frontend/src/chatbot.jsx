import React, { useState, useEffect, useRef } from "react";
import Navbar from "./component/navbaru";
import axios from "axios";

const Chatbot = () => {
  const token = localStorage.getItem("token");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Halo, ada keluhan kesehatan apa yang ingin kamu diskusikan hari ini?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // auto scroll ke bawah
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/chatbot", {
        message: userMessage.text,
        history: newMessages, // 👈 kirim riwayat chat
      });

      const botMessage = {
        sender: "bot",
        text: response.data.reply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Maaf, AI sedang bermasalah. Coba lagi sebentar ya 😵‍💫",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      <main className="mx-auto px-28 py-8">
        {/* HEADER */}
        <section className="mb-6">
          <h2 className="text-4xl font-bold text-blue-900 mb-2">
            Chatbot Konsultasi AI
          </h2>
          <p className="text-blue-400 mt-1">
            Konsultasi awal kesehatan berbasis AI
          </p>
        </section>

        <div className="bg-[#eff6ff] rounded-4xl p-8 flex gap-6 h-[870px]">
          {/* CHAT AREA */}
          <div className="flex-1 bg-white rounded-[25px] p-6 flex flex-col shadow-sm">
            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
              {messages.map((msg, index) =>
                msg.sender === "bot" ? (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
                      🤖
                    </div>
                    <div className="bg-[#f3f4f6] text-slate-700 p-4 rounded-2xl rounded-tl-none max-w-[70%] text-sm leading-relaxed">
                      {msg.text}
                    </div>
                  </div>
                ) : (
                  <div
                    key={index}
                    className="flex items-start justify-end gap-3"
                  >
                    <div className="bg-[#dcf0ff] text-slate-700 p-4 rounded-2xl rounded-tr-none max-w-[70%] text-sm leading-relaxed">
                      {msg.text}
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gray-200" />
                  </div>
                ),
              )}

              {loading && (
                <div className="text-sm text-gray-400">
                  AI sedang mengetik...
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* INPUT */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Tulis keluhan kesehatanmu..."
                className="flex-1 bg-white border border-gray-300 rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="bg-[#5a93d0] hover:bg-blue-600 text-white w-12 h-12 rounded-xl flex items-center justify-center transition shadow-md disabled:opacity-50"
              >
                ➤
              </button>
            </div>
          </div>

          {/* SIDEBAR RIWAYAT */}
          <div className="w-80 bg-white rounded-[25px] p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Riwayat Chat
            </h3>

            <div className="space-y-3 text-sm overflow-y-auto h-[700px] pr-1">
              {messages
                .filter((m) => m.sender === "user")
                .map((m, i) => (
                  <div
                    key={i}
                    className="p-3 bg-slate-100 rounded-lg text-slate-700 truncate"
                    title={m.text}
                  >
                    {m.text}
                  </div>
                ))}

              {messages.length === 1 && (
                <p className="text-slate-400 text-xs">
                  Belum ada riwayat percakapan
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chatbot;
