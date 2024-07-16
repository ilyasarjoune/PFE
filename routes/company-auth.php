<?php


use App\Http\Controllers\Company\Auth\CompanyLoginController;
use App\Http\Controllers\Company\Auth\CompanyRegisterController;
use App\Http\Controllers\CompanieController;
use Illuminate\Support\Facades\Route;

Route::prefix('company')->middleware('guest:company')->group(function () {
    Route::get('register', [CompanyRegisterController::class, 'create'])->name('company.register');

    Route::post('register', [CompanyRegisterController::class, 'store']);

    Route::get('login', [CompanyLoginController::class, 'create'])->name('company.login');

    Route::post('login', [CompanyLoginController::class, 'store']);

    
});



Route::prefix('company')->middleware('auth:company')->group(function () {
    Route::redirect('/','/company/company');
    Route::resource('offer', CompanieController::class);
    Route::post('logout', [CompanyLoginController::class, 'destroy'])
                ->name('logout');
});
