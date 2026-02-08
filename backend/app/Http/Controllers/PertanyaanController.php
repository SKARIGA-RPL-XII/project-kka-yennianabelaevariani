<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PertanyaanController extends Controller
{
    /**
     * Ambil semua pertanyaan skrining
     */
    public function index()
    {
        $pertanyaan = DB::table('pertanyaan')
            ->join('kategori', 'pertanyaan.kategori_id', '=', 'kategori.id')
            ->select(
                'pertanyaan.id',
                'pertanyaan.teks_pertanyaan as teks',
                'pertanyaan.bobot',
                'pertanyaan.is_darurat',
                'kategori.kode as kategori_kode',
                'kategori.nama as kategori_nama'
            )
            ->orderBy('kategori.id')
            ->orderBy('pertanyaan.id')
            ->get();

        return response()->json($pertanyaan);
    }
}
