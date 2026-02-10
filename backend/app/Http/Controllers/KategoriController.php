<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KategoriController extends Controller
{
    /**
     * Ambil semua data kategori
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
     * Simpan kategori baru dengan Validasi Manual
     */
    public function store(Request $request)
    {
        // Validasi: Kode dan Nama harus Unik di tabel 'kategori'
        $validator = Validator::make($request->all(), [
            'kode' => 'required|max:10|unique:kategori,kode',
            'nama' => 'required|max:100|unique:kategori,nama',
        ], [
            // Custom pesan error agar user paham
            'kode.unique' => 'Kode kategori ini sudah terdaftar gess!',
            'nama.unique' => 'Nama kategori ini sudah ada, coba nama lain!',
            'kode.required' => 'Kode wajib diisi ya.',
            'nama.required' => 'Nama wajib diisi ya.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors'  => $validator->errors()
            ], 422);
        }

        $kategori = Kategori::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Kategori Berhasil Ditambahkan!',
            'data'    => $kategori
        ], 201);
    }

    /**
     * Update data kategori dengan validasi pengecualian
     */
    public function update(Request $request, $id)
    {
        $kategori = Kategori::find($id);

        if (!$kategori) {
            return response()->json(['message' => 'Kategori tidak ditemukan'], 404);
        }

        // Validasi: Unik, tapi abaikan jika itu adalah datanya sendiri (current ID)
        $validator = Validator::make($request->all(), [
            'kode' => 'required|max:10|unique:kategori,kode,' . $id,
            'nama' => 'required|max:100|unique:kategori,nama,' . $id,
        ], [
            'kode.unique' => 'kodenya sudah dipakai kategori lain!, coba ganti kode nya',
            'nama.unique' => 'Nama kategori ini sudah ada!',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors'  => $validator->errors()
            ], 422);
        }

        $kategori->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Kategori Berhasil Diupdate!',
            'data'    => $kategori
        ], 200);
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