<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Response;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        $stats = [
            'total_users' => User::count(),
            'active_users' => User::where('is_active', true)->count(),
            'inactive_users' => User::where('is_active', false)->count(),
            'admin_count' => User::role('admin')->count(),
            'operator_count' => User::role('operator')->count(),
            'user_count' => User::role('user')->count(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
        ]);
    }

    public function settings(): Response
    {
        return Inertia::render('Admin/Settings');
    }
}
