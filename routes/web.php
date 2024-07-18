<?php
use App\Http\Controllers\DomaineController;
use App\Http\Controllers\InternshipsController;
use App\Http\Controllers\StoreWebScrapingDataController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\OfferController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route for domaines
Route::get('/domaines', [DomaineController::class, 'index'])->name('domaines.index');

// Route for the Welcome page
Route::get('/', function () {
    if (auth()->check() ) {
        if (auth()->user()->is_admin) {
            return redirect('/admin');
        }
        return redirect('/');
    }
    
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

// Group routes that require authentication and email verification
Route::middleware(['auth', 'verified', \App\Http\Middleware\AdminMiddleware::class])->group(function () {
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

// Admin routes
Route::middleware(['auth', 'admin'])->group(function () {
    Route::redirect('/internships' , '/admin');
    Route::get('/admin', [AdminController::class, 'dashboard'])->name('admin.dashboard');

    Route::prefix('admin')->group(function () {
        Route::get('users', [AdminController::class, 'showUsers'])->name('admin.users');
        Route::get('internships', [AdminController::class, 'showInternships'])->name('admin.internships');
        Route::get('companie', [AdminController::class, 'showCompanies'])->name('admin.company');
        Route::get('offersrequests', [AdminController::class, 'showRequestedOfferrs'])->name('admin.requests');
        Route::delete('users/{id}', [AdminController::class, 'deleteUser'])->name('admin.deleteUser');
        Route::delete('internships/{id}', [AdminController::class, 'deleteInternship'])->name('admin.deleteInternship');
        Route::delete('companie/{id}', [AdminController::class, 'deleteCompany'])->name('admin.deletecompany');
        Route::post('offersrequests/{id}/accept', [OfferController::class, 'accept'])->name('offerRequests.accept');
        Route::post('offersrequests/{id}/refuse', [OfferController::class, 'refuse'])->name('offerRequests.refuse');
    });
});

// Auth routes
require __DIR__.'/auth.php';
require __DIR__.'/company-auth.php';
