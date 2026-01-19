<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatbotController;


// Route::get('/chat', [ChatbotController::class, 'chat']);
Route::post('/chat', [ChatbotController::class, 'chat']);
