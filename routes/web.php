<?php
use App\Http\Controllers\DomaineController;
use App\Http\Controllers\InternshipsController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\StoreWebScrapingDataController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route for domaines
Route::get('/domaines', [DomaineController::class, 'index'])->name('domaines.index');

// Route for the Welcome page
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::redirect('/', '/internship')->middleware(['auth', 'verified']);
// Group routes that require authentication and email verification
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');
    
    Route::resource('internship', InternshipsController::class);
    Route::post('/internships/save', [InternshipsController::class, 'save'])->name('internships.save');
    Route::get('/saved-internships', [InternshipsController::class, 'saved'])->name('internships.saved');
    Route::post('/internships/unsave', [InternshipsController::class, 'unsave'])->name('internships.unsave');
    Route::get('/internships/search', [InternshipsController::class, 'search'])->name('internships.search');
});

// Group routes that require authentication
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route for internships
Route::get('/internships', [StoreWebScrapingDataController::class, 'index']);

// Auth routes
require __DIR__.'/auth.php';
