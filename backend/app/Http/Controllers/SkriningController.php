<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class SkriningController extends Controller
{
    public function store(Request $request)
    {
        // 1. Pastikan User Auth
        if (!$request->user()) {
            return response()->json(['message' => 'Unauthenticated gess, login dulu!'], 401);
        }

        // 2. Validasi Input
        $validator = Validator::make($request->all(), [
            'jawaban' => 'required|array',
            'jawaban.*.pertanyaan_id' => 'required|integer',
            'jawaban.*.skala_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $currentUserId = $request->user()->id_user;

        DB::beginTransaction();
        try {
            // A. Buat Header Skrining Dulu
            $skriningId = DB::table('skrining')->insertGetId([
                'user_id'    => $currentUserId,
                'total_skor' => 0,
                'status'     => 'proses',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $totalSkor = 0;
            $skorMaksimal = 0;
            
            // Ambil nilai tertinggi sekali saja di luar loop untuk efisiensi
            $nilaiTertinggi = DB::table('skala_jawaban')->max('nilai') ?? 4;

            // B. Looping Jawaban
            foreach ($request->jawaban as $item) {
                $pertanyaan = DB::table('pertanyaan')->where('id', $item['pertanyaan_id'])->first();
                $skala = DB::table('skala_jawaban')->where('id', $item['skala_id'])->first();

                if ($pertanyaan && $skala) {
                    // Pakai bobot jika ada, kalau tidak ada default ke 1
                    $bobot = $pertanyaan->bobot ?? 1;
                    $skorBaris = $bobot * $skala->nilai;
                    
                    $totalSkor += $skorBaris;
                    $skorMaksimal += ($bobot * $nilaiTertinggi);

                    // Insert ke detail jawaban
                    // PENTING: Hapus 'user_id' jika di migration tabel ini tidak ada kolom user_id
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

            // C. Hitung Status Berdasarkan Persentase
            $persentase = ($skorMaksimal > 0) ? ($totalSkor / $skorMaksimal) * 100 : 0;
            
            if ($persentase <= 33) { 
                $status = 'Rendah'; 
            } elseif ($persentase <= 66) { 
                $status = 'Sedang'; 
            } else { 
                $status = 'Tinggi'; 
            }

            // D. Update Header dengan Hasil Akhir
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
                'message' => 'Detail Error: ' . $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile()
            ], 500);
        }
    }
}