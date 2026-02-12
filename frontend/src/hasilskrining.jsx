import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./component/navbaru";

const HasilSkrining = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { status, total_skor } = location.state || {};

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="px-28 py-10">
        <h1 className="text-3xl font-bold mb-6">Hasil Skrining Kamu</h1>

        <div className="border p-6 rounded-lg">
          <p>
            <strong>Status:</strong> {status}
          </p>
          <p>
            <strong>Total Skor:</strong> {total_skor}
          </p>
        </div>

        <button
          onClick={() => navigate("/skrining")}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded"
        >
          Ulangi Skrining
        </button>
      </main>
    </div>
  );
};

export default HasilSkrining;
