<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\ChatHistory;

class ChatbotController extends Controller
{
    public function chat(Request $request)
    {
        $userId = auth()->id();

        if (!$userId) {
            return response()->json(['error' => 'Kamu harus login terlebih dahulu'], 401);
        }

        $message = $request->input('message');
        $chatHistory = $request->input('history', []); 

        if (!$message) {
            return response()->json(['error' => 'Pesan wajib diisi'], 400);
        }

        ChatHistory::create([
            'user_id' => $userId,
            'sender' => 'user',
            'message' => $message
        ]);

        $context = "";
        foreach (array_slice($chatHistory, -5) as $chat) {
            $role = $chat['sender'] == 'bot' ? 'Assistant' : 'User';
            $context .= $role . ": " . $chat['text'] . "\n";
        }

        $prompt = "Kamu adalah AI Chatbot Konsultan Kesehatan Awal. 
        Jawab dengan bahasa Indonesia yang ramah dan singkat.
        Jangan memberi diagnosis pasti, hanya saran awal.

        Riwayat Percakapan:
        {$context}
        User: {$message}
        Assistant:";

        try {
        // ini model baru dari gemini nya, ternyata harus kirim header bukan query key= lagi hehe
        $response = Http::timeout(30)
            ->withHeaders([
                'Content-Type' => 'application/json',
                'x-goog-api-key' => config('services.gemini.api_key'), // ini kamu bisa setting di config/services.php
            ])
            ->post(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",
                [
                    "contents" => [
                        [
                            "parts" => [
                                ["text" => $prompt]
                            ]
                        ]
                    ],
                    "generationConfig" => [
                        "temperature" => 0.7,
                        "maxOutputTokens" => 800
                    ]
                ]
            );

            if ($response->failed()) {
                Log::error('Gemini API Error:', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
                
                return response()->json([
                    'error' => 'Gagal menghubungi AI',
                    'message' => 'Cek log server untuk detail error.'
                ], 500);
            }

            $result = $response->json();
            $reply = $result['candidates'][0]['content']['parts'][0]['text'] ?? 'Maaf, aku tidak mengerti.';

            ChatHistory::create([
                'user_id' => $userId,
                'sender' => 'bot',
                'message' => $reply
            ]);

            return response()->json([
                'status' => 'success',
                'reply' => $reply
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Terjadi kesalahan sistem'], 500);
        }
    }

    public function history()
    {
        return ChatHistory::where('user_id', auth()->id())
            ->orderBy('created_at', 'asc')
            ->get();
    }
}
