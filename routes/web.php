<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('', [PostController::class, 'paginate'])->name('home');

Route::get('post/{id}', [PostController::class, 'show'])->name('post.show');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('profile', function () {
        return Inertia::render('profile');
    })->name('profile');

    Route::get('create-post', [PostController::class, 'create'])->name('post.create');

    Route::post('post', [PostController::class, 'store'])->name('post.store');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
