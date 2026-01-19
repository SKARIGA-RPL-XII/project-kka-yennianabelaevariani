<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatbotController extends Controller
{
    public function chat(Request $request)
    {
        $prompt = $request->input('message');

        // Validasi input
        if (!$prompt) {
            return response()->json([
                'error' => 'message tidak boleh kosong'
            ], 400);
        }

        try {
            $response = Http::timeout(20)->post(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' . env('GEMINI_API_KEY'),
                [
                    "contents" => [
                        [
                            "parts" => [
                                ["text" => $prompt]
                            ]
                        ]
                    ]
                ]
            );

            // Kalau API gagal
            if (!$response->successful()) {
                return response()->json([
                    'error' => 'API Gemini gagal',
                    'detail' => $response->body()
                ], $response->status());
            }

            $data = $response->json();

            // Ambil teks jawaban dari struktur Gemini
            $reply = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;

            return response()->json([
                'message' => $reply,
                'raw' => $data // bisa dihapus kalau sudah yakin jalan
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Request gagal',
                'detail' => $e->getMessage()
            ], 500);
        }
    }
}
