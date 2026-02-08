<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KategoriController extends Controller
{
    /**
     * Ambil semua data kategori untuk ditampilkan di tabel/dropdown
     */
    public function index()
    {
        $kategori = Kategori::all();
        return response()->json([
            'success' => true,
            'message' => 'Daftar Kategori Kesehatan',
            'data'    => $kategori
        ], 200);
    }

    /**
     * Simpan kategori baru (buat fitur Tambah Kategori)
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kode' => 'required|unique:kategori,kode|max:10',
            'nama' => 'required|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $kategori = Kategori::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Kategori Berhasil Ditambahkan!',
            'data'    => $kategori
        ], 201);
    }

    /**
     * Tampilkan detail satu kategori
     */
    public function show($id)
    {
        $kategori = Kategori::find($id);

        if ($kategori) {
            return response()->json([
                'success' => true,
                'data'    => $kategori
            ], 200);
        }

        return response()->json(['message' => 'Kategori tidak ditemukan'], 404);
    }

    /**
     * Update data kategori
     */
    public function update(Request $request, $id)
    {
        $kategori = Kategori::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'kode' => 'required|max:10|unique:kategori,kode,' . $kategori->id,
            'nama' => 'required|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $kategori->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Kategori Berhasil Diupdate!',
            'data'    => $kategori
        ], 200);
    }

    /**
     * Hapus kategori
     */
    public function destroy($id)
    {
        $kategori = Kategori::find($id);

        if ($kategori) {
            $kategori->delete();
            return response()->json([
                'success' => true,
                'message' => 'Kategori Berhasil Dihapus!'
            ], 200);
        }

        return response()->json(['message' => 'Gagal menghapus, data tidak ada'], 404);
    }
}