<?php

use App\Http\Controllers\internshipsController;
use App\Http\Controllers\StoreWebScrapingDataController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
 Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');

    Route::resource('internship',internshipsController::class);
    Route::post('/internships/save', [InternshipsController::class, 'save'])->name('internships.save');
    Route::get('/saved-internships', [InternshipsController::class, 'saved'])->name('internships.saved');
    Route::post('/internships/unsave', [InternshipsController::class, 'unsave'])->name('internships.unsave');
    Route::get('/internships/search', [InternshipsController::class, 'search'])->name('internships.search');



});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::get('/internships', [StoreWebScrapingDataController::class, 'index']);
require __DIR__.'/auth.php';
 