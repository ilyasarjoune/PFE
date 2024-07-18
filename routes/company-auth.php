<?php

use App\Http\Controllers\Company\Auth\CompanyLoginController;
use App\Http\Controllers\Company\Auth\CompanyRegisterController;
use App\Http\Controllers\CompanieController;
use App\Http\Controllers\OfferController;
// Import the OfferRequestController
use Illuminate\Support\Facades\Route;

// Routes for company authentication
Route::prefix('company')->middleware('guest:company')->group(function () {
    Route::get('company_register', [CompanyRegisterController::class, 'create'])->name('company.register');
    Route::post('company_register', [CompanyRegisterController::class, 'store']);
    Route::get('company_login', [CompanyLoginController::class, 'create'])->name('company.login');
    Route::post('company_login', [CompanyLoginController::class, 'store']);
});

// Routes for authenticated company
Route::prefix('company')->middleware('auth:company')->group(function () {
    Route::redirect('/', '/company/offer');
    
    Route::resource('offer', CompanieController::class);
    Route::post('logout', [CompanyLoginController::class, 'destroy'])->name('company.logout');
    
    // Offer request routes
    Route::get('offer-requests/create', [OfferController::class, 'create'])->name('offer-requests.create');
    Route::post('offer-requests', [OfferController::class, 'store'])->name('offer-requests.store');
    Route::get('company/offers', [OfferController::class, 'getOffers'])->name('company.offers');
    Route::delete('company/offers/{id}', [OfferController::class, 'destroy'])->name('company.offers.destroy');
    Route::get('offer/postedOffers', [OfferController::class, 'getPostedOffers'])->name('company.postedOffers');

});
