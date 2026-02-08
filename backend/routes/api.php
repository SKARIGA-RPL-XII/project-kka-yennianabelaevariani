<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\SkriningController;
use App\Http\Controllers\PertanyaanController;

// Route::get('/chat', [ChatbotController::class, 'chat']);
Route::post('/chat', [ChatbotController::class, 'chat']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/skrining', [SkriningController::class, 'store']);
Route::get('/pertanyaan', [PertanyaanController::class, 'index']);