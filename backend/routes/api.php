<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\UserController;

use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'register']);
// Route::post('login', [AuthController::class, 'login']);

Route::post('login', [AuthController::class, 'login'])->name('login');



Route::get('/users', [UserController::class, 'index']);
Route::delete('/users/{id}', [UserController::class, 'destroy']); // ✅ OUTSIDE of middleware


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'userProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Product Routes
    Route::get('products', [ProductController::class, 'index']);
    Route::post('products', [ProductController::class, 'store']);
    Route::delete('products/{id}', [ProductController::class, 'destroy']);

    // Order Routes
    Route::post('orders', [OrderController::class, 'store']);
    Route::get('orders', [OrderController::class, 'index']);

    // Dashboard Routes
    Route::get('dashboard', [DashboardController::class, 'index']);

    // routes/api.php
    Route::get('/check-payment-status/{txnId}', [PaymentController::class, 'checkStatus']);


    // Admin Routes (protected by the 'role:admin' middleware)
    Route::middleware('role:admin')->group(function () {
        Route::get('admin/products', [ProductController::class, 'adminIndex']);
        Route::post('admin/products', [ProductController::class, 'store']);
        Route::delete('admin/products/{id}', [ProductController::class, 'destroy']);
    });
});
