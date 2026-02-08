<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SkriningController extends Controller
{
    public function store(Request $request)
    {
        /**
         * Expected payload:
         * {
         *   "user_id": 1,
         *   "jawaban": [
         *     { "pertanyaan_id": 1, "skala_id": 3 },
         *     { "pertanyaan_id": 2, "skala_id": 1 }
         *   ]
         * }
         */

        DB::beginTransaction();

        try {
            // 1️⃣ Buat record skrining awal
            $skriningId = DB::table('skrining')->insertGetId([
                'user_id' => $request->user_id,
                'total_skor' => 0,
                'status' => 'rendah',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $totalSkor = 0;
            $statusDarurat = false;

            foreach ($request->jawaban as $item) {
                $pertanyaan = DB::table('pertanyaan')->where('id', $item['pertanyaan_id'])->first();
                $skala = DB::table('skala_jawaban')->where('id', $item['skala_id'])->first();

                if (!$pertanyaan || !$skala) {
                    continue;
                }

                $skor = $pertanyaan->bobot * $skala->nilai;
                $totalSkor += $skor;

                // 🚨 cek darurat
                if ($pertanyaan->is_darurat && $skala->nilai >= 2) {
                    $statusDarurat = true;
                }

                DB::table('jawaban_skrining')->insert([
                    'skrining_id' => $skriningId,
                    'pertanyaan_id' => $pertanyaan->id,
                    'skala_id' => $skala->id,
                    'skor' => $skor,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            // 2️⃣ Tentukan status
            if ($statusDarurat) {
                $status = 'tinggi';
            } elseif ($totalSkor <= 20) {
                $status = 'rendah';
            } elseif ($totalSkor <= 45) {
                $status = 'sedang';
            } else {
                $status = 'tinggi';
            }

            // 3️⃣ Update skrining
            DB::table('skrining')->where('id', $skriningId)->update([
                'total_skor' => $totalSkor,
                'status' => $status,
                'updated_at' => now(),
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Skrining berhasil',
                'skrining_id' => $skriningId,
                'total_skor' => $totalSkor,
                'status' => $status
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Terjadi kesalahan',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
