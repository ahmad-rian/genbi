<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'totalUsers' => User::count(),
            'totalRoles' => Role::count(),
            'totalPermissions' => Permission::count(),
        ]);
    }

    public function settings(): Response
    {
        return Inertia::render('Admin/Settings');
    }
}
