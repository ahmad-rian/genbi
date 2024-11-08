<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Admin\{
    UserController,
    RoleController,
    PermissionController,
    AdminDashboardController
};
use App\Http\Controllers\ArtikelController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\Operator\OperatorDashboardController;
use App\Http\Controllers\OrganisasiController;
use App\Http\Controllers\TentangController;
use Illuminate\Support\Facades\Route;

// Public Routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/tentang', [TentangController::class, 'index'])->name('tentang');
Route::get('/organisasi', [OrganisasiController::class, 'index'])->name('organisasi');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::get('/artikel', [ArtikelController::class, 'index'])->name('artikel');
Route::get('/media', [MediaController::class, 'index'])->name('media');

// Authentication Routes
Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
    Route::get('register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    // Logout Route
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    // Dashboard Route
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Profile Routes
    Route::prefix('profile')->name('profile.')->controller(ProfileController::class)->group(function () {
        Route::get('/', 'edit')->name('edit');
        Route::patch('/', 'update')->name('update');
        Route::delete('/', 'destroy')->name('destroy');
    });

    // Admin Routes
    Route::middleware('role:admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');

        // Users Management
        Route::resource('users', UserController::class);

        // Roles Management
        Route::resource('roles', RoleController::class);

        // Permissions Management (Read-only)
        Route::resource('permissions', PermissionController::class)->except(['create', 'store', 'destroy']);

        // Settings Page
        Route::get('settings', [AdminDashboardController::class, 'settings'])->name('settings');
    });

    // Operator Routes
    Route::middleware('role:operator')->prefix('operator')->name('operator.')->group(function () {
        Route::get('/', [OperatorDashboardController::class, 'index'])->name('dashboard');

        // Limited User Management
        Route::resource('users', UserController::class)->only(['index', 'show', 'edit', 'update']);

        // Reports Page
        Route::get('reports', [OperatorDashboardController::class, 'reports'])->name('reports');
    });
});

// Handle 404 Errors
Route::fallback(function () {
    return response()->view('errors.404', [], 404);
});
