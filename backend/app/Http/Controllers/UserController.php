<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Register / Store User Baru
     */
    public function register(Request $request) 
    {
        // 1. Validasi sesuai skema baru
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
            'tanggal_lahir' => 'required|date',
            'telepon' => 'nullable|string|max:15',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi Gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        // 2. Simpan ke database
        $user = User::create([
            'nama' => $request->nama,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'jenis_kelamin' => $request->jenis_kelamin,
            'tanggal_lahir' => $request->tanggal_lahir,
            'telepon' => $request->telepon,
            'role' => $request->role ?? 'user',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Registrasi Berhasil!',
            'data' => $user
        ], 201);
    }

    public function index()
    {
        $users = User::all();
        return response()->json([
            'success' => true,
            'message' => 'Daftar data user',
            'data'    => $users
        ], 200);
    }

    public function show($id)
    {
        // Karena PK kita id_user, find tetap bisa jalan kalau di model sudah disetting primaryKey
        $user = User::find($id);

        if ($user) {
            return response()->json([
                'success' => true,
                'message' => 'Detail Data User',
                'data'    => $user
            ], 200);
        }

        return response()->json(['success' => false, 'message' => 'User Tidak Ditemukan!'], 404);
    }

    /**
     * Update data user (Profil)
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'nama'  => 'required',
            'email' => 'required|email|unique:users,email,' . $user->id_user . ',id_user',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user->update([
            'nama'  => $request->nama,
            'email' => $request->email,
            'jenis_kelamin' => $request->jenis_kelamin,
            'tanggal_lahir' => $request->tanggal_lahir,
            'telepon' => $request->telepon,
        ]);

        if ($request->password) {
            $user->update(['password' => Hash::make($request->password)]);
        }

        return response()->json([
            'success' => true,
            'message' => 'User Berhasil Diupdate!',
            'data'    => $user
        ], 200);
    }

    public function destroy($id)
    {
        $user = User::find($id);
        if ($user) {
            $user->delete();
            return response()->json(['success' => true, 'message' => 'User Berhasil Dihapus!'], 200);
        }
        return response()->json(['success' => false, 'message' => 'User Tidak Ditemukan!'], 404);
    }
}