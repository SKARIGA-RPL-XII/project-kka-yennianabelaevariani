<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Mengambil semua data user
     */
    public function index()
    {
        $users = User::all();
        return response()->json([
            'success' => true,
            'message' => 'Daftar data user',
            'data'    => $users
        ], 200);
    }

    /**
     * Menampilkan detail user tertentu
     */
    public function show($id)
    {
        $user = User::find($id);

        if ($user) {
            return response()->json([
                'success' => true,
                'message' => 'Detail Data User',
                'data'    => $user
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'User Tidak Ditemukan!',
        ], 404);
    }

    /**
     * Update data user (Profil)
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name'  => 'required',
            'email' => 'required|email|unique:users,email,' . $user->id,
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user->update([
            'name'  => $request->name,
            'email' => $request->email,
        ]);

        // Cek jika password juga ingin diubah
        if ($request->password) {
            $user->update([
                'password' => Hash::make($request->password)
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'User Berhasil Diupdate!',
            'data'    => $user
        ], 200);
    }

    /**
     * Menghapus user
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if ($user) {
            $user->delete();
            return response()->json([
                'success' => true,
                'message' => 'User Berhasil Dihapus!',
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'User Tidak Ditemukan!',
        ], 404);
    }
}