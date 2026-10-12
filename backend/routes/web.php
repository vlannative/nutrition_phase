<?php

use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\ArticleFeedController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductFeedController;
use Illuminate\Support\Facades\Route;

Route::get('/', fn () => response()->file(public_path('index.html')))->name('home');
Route::middleware('throttle:60,1')->group(function (): void {
    Route::get('/api/products', ProductFeedController::class)->name('products.feed');
    Route::get('/api/articles', ArticleFeedController::class)->name('articles.feed');
    Route::get('/articles/{article:slug}', [ArticleFeedController::class, 'show'])->name('articles.show');
});
Route::get('/admin/login', [AuthController::class, 'showLogin'])->middleware('guest')->name('login');
Route::post('/admin/login', [AuthController::class, 'login'])->middleware(['guest', 'throttle:5,1'])->name('admin.login.store');
Route::post('/admin/logout', [AuthController::class, 'logout'])->middleware('auth')->name('admin.logout');
Route::prefix('admin')->name('admin.')->middleware(['log.admin.access', 'auth', 'admin', 'throttle:120,1'])->group(function (): void {
    Route::get('/', fn () => redirect()->route('admin.products.index'));
    Route::resource('products', ProductController::class)->except('show');
    Route::resource('articles', ArticleController::class)->except('show');
});
