<?php

use Illuminate\Http\Request;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\SkriningController;
use App\Http\Controllers\PertanyaanController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\PertanyaanSkriningController;

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

Route::get('/kategori', [KategoriController::class, 'index']);
Route::post('/kategori', [KategoriController::class, 'store']);
Route::get('/kategori/{id}', [KategoriController::class, 'show']);
Route::put('/kategori/{id}', [KategoriController::class, 'update']);
Route::delete('/kategori/{id}', [KategoriController::class, 'destroy']);

// Bungkus dengan middleware sanctum agar auth()->id() bisa terbaca
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/chatbot', [ChatbotController::class, 'chat']);
    Route::get('/chatbot/history', [ChatbotController::class, 'history']);
});

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/skrining', [SkriningController::class, 'store']);
Route::get('/pertanyaan', [PertanyaanController::class, 'index']);
Route::apiResource('/pertanyaanskrining', PertanyaanSkriningController::class);