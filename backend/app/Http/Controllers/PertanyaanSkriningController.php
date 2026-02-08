<?php

namespace App\Http\Controllers;

use App\Models\Pertanyaan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PertanyaanSkriningController extends Controller
{
    /**
     * Ambil semua pertanyaan (beserta data kategorinya)
     */
    public function index(Request $request)
    {
        $query = Pertanyaan::with('kategori');

        // Fitur Filter by Kategori (berguna buat di React nanti)
        if ($request->has('kategori_id')) {
            $query->where('kategori_id', $request->kategori_id);
        }

        $pertanyaan = $query->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar Pertanyaan Skrining',
            'data'    => $pertanyaan
        ], 200);
    }

    /**
     * Simpan pertanyaan baru
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kategori_id'     => 'required|exists:kategori,id',
            'teks_pertanyaan' => 'required',
            'bobot'           => 'required|integer',
            'is_darurat'      => 'required|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $pertanyaan = Pertanyaan::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Pertanyaan berhasil ditambahkan!',
            'data'    => $pertanyaan->load('kategori')
        ], 201);
    }

    /**
     * Detail pertanyaan
     */
    public function show($id)
    {
        $pertanyaan = Pertanyaan::with('kategori')->find($id);

        if (!$pertanyaan) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        return response()->json([
            'success' => true,
            'data'    => $pertanyaan
        ], 200);
    }

    /**
     * Update pertanyaan
     */
    public function update(Request $request, $id)
    {
        $pertanyaan = Pertanyaan::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'kategori_id'     => 'required|exists:kategori,id',
            'teks_pertanyaan' => 'required',
            'bobot'           => 'required|integer',
            'is_darurat'      => 'required|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $pertanyaan->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Pertanyaan berhasil diupdate!',
            'data'    => $pertanyaan->load('kategori')
        ], 200);
    }

    /**
     * Hapus pertanyaan
     */
    public function destroy($id)
    {
        $pertanyaan = Pertanyaan::find($id);

        if ($pertanyaan) {
            $pertanyaan->delete();
            return response()->json([
                'success' => true,
                'message' => 'Pertanyaan berhasil dihapus!'
            ], 200);
        }

        return response()->json(['message' => 'Data tidak ditemukan'], 404);
    }
}