<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BukuController;
use App\Http\Controllers\RegisterController;

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [RegisterController::class, 'login']);

Route::middleware('auth:sanctum')->group(function() {
    Route::post('/book/store', [BukuController::class, 'store']);
    Route::get('/buku', [BukuController::class, 'index']);
    Route::get('/logout', [RegisterController::class, 'logout']);

    Route::controller(BukuController::class)->group(function() {
        Route::get('/book/buku', 'index');
        Route::get('/book/show/{id}', 'show');
        Route::post('/book/update/{id}', 'update');
        Route::get('/book/delete/{id}', 'destroy');
    });
});
