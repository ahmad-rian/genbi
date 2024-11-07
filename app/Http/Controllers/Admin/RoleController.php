<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    public function index(): Response
    {
        $roles = Role::with('permissions')
            ->withCount('users')
            ->get()
            ->map(function ($role) {
                return [
                    'id' => $role->id,
                    'name' => $role->name,
                    'users_count' => $role->users_count,
                    'permissions' => $role->permissions->pluck('name'),
                    'created_at' => $role->created_at->format('Y-m-d H:i:s'),
                ];
            });

        return Inertia::render('Admin/Roles/Index', [
            'roles' => $roles
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Roles/Create', [
            'permissions' => Permission::all()->pluck('name'),
            'availablePermissions' => Permission::all()
                ->groupBy(function ($permission) {
                    return explode('-', $permission->name)[1]; // group by resource (users, profiles, etc)
                })
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:roles'],
            'permissions' => ['required', 'array'],
            'permissions.*' => ['exists:permissions,name']
        ]);

        $role = Role::create(['name' => $validated['name']]);
        $role->givePermissionTo($validated['permissions']);

        return redirect()->route('admin.roles.index')
            ->with('message', 'Role created successfully');
    }

    public function edit(Role $role): Response
    {
        return Inertia::render('Admin/Roles/Edit', [
            'role' => [
                'id' => $role->id,
                'name' => $role->name,
                'permissions' => $role->permissions->pluck('name'),
            ],
            'availablePermissions' => Permission::all()
                ->groupBy(function ($permission) {
                    return explode('-', $permission->name)[1];
                })
        ]);
    }

    public function update(Request $request, Role $role)
    {
        if ($role->name === 'admin') {
            return back()->with('error', 'Cannot modify admin role');
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:roles,name,' . $role->id],
            'permissions' => ['required', 'array'],
            'permissions.*' => ['exists:permissions,name']
        ]);

        $role->update(['name' => $validated['name']]);
        $role->syncPermissions($validated['permissions']);

        return redirect()->route('admin.roles.index')
            ->with('message', 'Role updated successfully');
    }

    public function destroy(Role $role)
    {
        if ($role->name === 'admin' || $role->name === 'operator' || $role->name === 'user') {
            return back()->with('error', 'Cannot delete default roles');
        }

        if ($role->users()->exists()) {
            return back()->with('error', 'Cannot delete role with associated users');
        }

        $role->delete();

        return redirect()->route('admin.roles.index')
            ->with('message', 'Role deleted successfully');
    }
}
