<?php


use App\Http\Controllers\PostController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Route;

// Middleware for authenticated routes
Route::middleware('auth:sanctum')->group(function () {
    // Routes pour les posts
    Route::post('posts', [PostController::class, 'store']);
    Route::get('posts', [PostController::class, 'index']);
    Route::get('posts/{id}', [PostController::class, 'show']);
    Route::put('posts/{id}/approve', [PostController::class, 'approve']);
    Route::post('posts/{id}/like', [PostController::class, 'like']);

    // Routes pour les sujets
    Route::post('subjects', [SubjectController::class, 'store']);
    Route::get('subjects', [SubjectController::class, 'index']);

    // Routes pour les notifications
    Route::get('notifications', [NotificationController::class, 'index']);
    Route::get('notifications/{id}', [NotificationController::class, 'show']);
});

// Public routes for viewing posts
Route::get('posts', [PostController::class, 'index']);
Route::get('posts/{id}', [PostController::class, 'show']);
