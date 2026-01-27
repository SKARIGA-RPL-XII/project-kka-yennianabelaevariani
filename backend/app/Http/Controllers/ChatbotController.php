<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatbotController extends Controller
{
    public function chat(Request $request)
{
    $prompt = $request->input('message');
    
    // Kita langsung pakai string URL utuh agar tidak ada typo variabel
    // Saya pakai model gemini-1.5-flash versi v1 (paling stabil)
    $url = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=AIzaSyB3w8fxonXzuUd29UlQJ-g_STQWl9BQiaI";

    try {
        $response = \Illuminate\Support\Facades\Http::withHeaders([
            'Content-Type' => 'application/json'
        ])->post($url, [
            "contents" => [
                ["parts" => [["text" => $prompt]]]
            ]
        ]);

        if ($response->failed()) {
            return response()->json([
                'status' => 'error',
                'google_says' => $response->json()
            ], $response->status());
        }

        $result = $response->json();
        return response()->json([
            'status' => 'success',
            'reply' => $result['candidates'][0]['content']['parts'][0]['text']
        ]);

    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}
}