<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class SkriningController extends Controller
{
    public function store(Request $request)
    {
        // 1. Validasi biar gak error 500 kalau data kosong
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'jawaban' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        DB::beginTransaction();

        try {
            // 2. Simpan ke tabel induk: 'skrining'
            // Pastikan tabel 'skrining' kamu punya kolom user_id, total_skor, dan status
            $skriningId = DB::table('skrining')->insertGetId([
                'user_id'    => $request->user_id,
                'total_skor' => 0,
                'status'     => 'proses',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $totalSkor = 0;
            $skorMaksimal = 0;

            // Ambil nilai tertinggi dari tabel skala_jawaban secara dinamis
            $nilaiTertinggi = DB::table('skala_jawaban')->max('nilai') ?? 1;

            // 3. Simpan detail jawaban
            foreach ($request->jawaban as $item) {
                $pertanyaan = DB::table('pertanyaan')->where('id', $item['pertanyaan_id'])->first();
                $skala = DB::table('skala_jawaban')->where('id', $item['skala_id'])->first();

                if ($pertanyaan && $skala) {
                    $skorBaris = $pertanyaan->bobot * $skala->nilai;
                    $totalSkor += $skorBaris;
                    $skorMaksimal += ($pertanyaan->bobot * $nilaiTertinggi);

                    DB::table('jawaban_skrining')->insert([
                        'skrining_id'   => $skriningId,
                        'pertanyaan_id' => $pertanyaan->id,
                        'skala_id'      => $skala->id,
                        'skor'          => $skorBaris,
                        'created_at'    => now(),
                        'updated_at'    => now(),
                    ]);
                }
            }

            // 4. Hitung Status Berdasarkan Persentase (0-100%)
            $persentase = ($skorMaksimal > 0) ? ($totalSkor / $skorMaksimal) * 100 : 0;
            
            if ($persentase <= 33) {
                $status = 'Rendah';
            } elseif ($persentase <= 66) {
                $status = 'Sedang';
            } else {
                $status = 'Tinggi';
            }

            // 5. Update hasil akhir ke tabel 'skrining'
            DB::table('skrining')->where('id', $skriningId)->update([
                'total_skor' => $totalSkor,
                'status'     => $status,
                'updated_at' => now(),
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'status'  => $status,
                'total_skor' => $totalSkor
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal simpan gess: ' . $e->getMessage()
            ], 500);
        }
    }
}