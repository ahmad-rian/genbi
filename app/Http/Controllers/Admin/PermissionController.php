<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index(): Response
    {
        $permissions = Permission::query()
            ->withCount('roles')
            ->get()
            ->groupBy(function ($permission) {
                return explode('-', $permission->name)[1]; // Group by resource
            })
            ->map(function ($group) {
                return $group->map(function ($permission) {
                    return [
                        'id' => $permission->id,
                        'name' => $permission->name,
                        'roles_count' => $permission->roles_count,
                        'created_at' => $permission->created_at->format('Y-m-d H:i:s'),
                    ];
                });
            });

        return Inertia::render('Admin/Permissions/Index', [
            'permissions' => $permissions
        ]);
    }

    public function show(Permission $permission): Response
    {
        $permission->load('roles');

        return Inertia::render('Admin/Permissions/Show', [
            'permission' => [
                'id' => $permission->id,
                'name' => $permission->name,
                'roles' => $permission->roles->map(function ($role) {
                    return [
                        'id' => $role->id,
                        'name' => $role->name,
                    ];
                }),
                'created_at' => $permission->created_at->format('Y-m-d H:i:s'),
            ]
        ]);
    }

    public function edit(Permission $permission): Response
    {
        return Inertia::render('Admin/Permissions/Edit', [
            'permission' => [
                'id' => $permission->id,
                'name' => $permission->name,
                'roles' => $permission->roles->pluck('name'),
            ],
            'availableRoles' => \Spatie\Permission\Models\Role::all()
                ->map(function ($role) {
                    return [
                        'id' => $role->id,
                        'name' => $role->name,
                    ];
                })
        ]);
    }

    public function update(Request $request, Permission $permission)
    {
        $validated = $request->validate([
            'roles' => ['required', 'array'],
            'roles.*' => ['exists:roles,id']
        ]);

        $roles = \Spatie\Permission\Models\Role::findMany($validated['roles']);
        $permission->syncRoles($roles);

        return redirect()->route('admin.permissions.index')
            ->with('message', 'Permission updated successfully');
    }
}
