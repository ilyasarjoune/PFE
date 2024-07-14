<?php

namespace App\Providers;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Route::aliasMiddleware('admin', AdminMiddleware::class);
        //
    }
}
