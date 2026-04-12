<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
// Pastikan nama model ini sesuai dengan file di app/Models/
use App\Models\User;
// Kalau model kamu namanya 'Screening' atau 'Consultation', ganti di sini gess!
use App\Models\Skrining; 
use App\Models\Konsultasi; 
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function getStats()
    {
        try {
            // Cek apakah tabel/model ada, jika tidak ada kita kasih default 0 agar tidak error 500
            $totalPengguna = class_exists(User::class) ? User::where('role', 'user')->count() : 0;
            $totalSkrining = class_exists(Skrining::class) ? Skrining::count() : 0;
            $totalKonsultasi = class_exists(Konsultasi::class) ? Konsultasi::count() : 0;

            // Grafik Pengguna Baru (Fixing potential DB issue)
            $userGrowth = User::select(
                DB::raw("DATE_FORMAT(created_at, '%b') as name"),
                DB::raw("COUNT(*) as total"),
                DB::raw("YEAR(created_at) as year")
              )
              ->groupBy('year', 'name')
              ->orderBy('year', 'asc')
              ->get()
              ->groupBy('name')
              ->map(function ($items, $name) {
                  $data = ['name' => $name];
                  foreach ($items as $item) {
                      $data[$item->year] = $item->total;
                  }
                  return $data;
              })->values();

            // Distribusi Resiko
            // Pastikan kolom 'hasil_resiko' ada di database kamu
            $low = class_exists(Skrining::class) ? Skrining::where('hasil_resiko', 'Rendah')->count() : 0;
            $med = class_exists(Skrining::class) ? Skrining::where('hasil_resiko', 'Sedang')->count() : 0;
            $high = class_exists(Skrining::class) ? Skrining::where('hasil_resiko', 'Tinggi')->count() : 0;
            
            $totalResiko = $low + $med + $high;
            
            $riskDistribution = [
                ['name' => 'Resiko Rendah', 'value' => $totalResiko > 0 ? round(($low/$totalResiko)*100) : 33],
                ['name' => 'Resiko Sedang', 'value' => $totalResiko > 0 ? round(($med/$totalResiko)*100) : 33],
                ['name' => 'Resiko Tinggi', 'value' => $totalResiko > 0 ? round(($high/$totalResiko)*100) : 34],
            ];

            return response()->json([
                'stats' => [
                    ['label' => 'Total Pengguna', 'value' => $totalPengguna, 'trend' => '+0', 'unit' => 'Orang'],
                    ['label' => 'Jumlah Skrining', 'value' => $totalSkrining, 'trend' => '+0', 'unit' => 'Sesi'],
                    ['label' => 'Total Konsultasi', 'value' => $totalKonsultasi, 'trend' => '+0', 'unit' => 'Pasien'],
                ],
                'userGrowth' => $userGrowth,
                'riskDistribution' => $riskDistribution
            ]);

        } catch (\Exception $e) {
            // Kalau error, munculkan pesan errornya di response agar kita tahu masalahnya
            return response()->json(['error' => $e->getMessage()], 500);
        }
    } 
}