<?php

use App\Http\Controllers\NotificationController;
use App\Http\Controllers\StoreWebScrapingDataController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
Route::middleware('auth:sanctum')->get('/notifications', [NotificationController::class, 'index']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

    Route::post('/internships', [StoreWebScrapingDataController::class, 'store']);
