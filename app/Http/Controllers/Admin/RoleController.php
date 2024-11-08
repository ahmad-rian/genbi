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
        return Inertia::render('Admin/Roles/Index', [
            'roles' => Role::with('permissions')->latest()->get()
                ->map(function ($role) {
                    return [
                        'id' => $role->id,
                        'name' => $role->name,
                        'permissions' => $role->permissions->pluck('name'),
                        'created_at' => $role->created_at,
                    ];
                }),
            'permissions' => Permission::all()->pluck('name'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Roles/Create', [
            'permissions' => Permission::all()->pluck('name'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:roles'],
            'permissions' => ['required', 'array'],
            'permissions.*' => ['string', 'exists:permissions,name'],
        ]);

        try {
            $role = Role::create(['name' => $validated['name']]);
            $role->syncPermissions($validated['permissions']);

            return redirect()->route('admin.roles.index')
                ->with('message', 'Role created successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to create role.'])->withInput();
        }
    }

    public function edit(Role $role): Response
    {
        return Inertia::render('Admin/Roles/Edit', [
            'role' => [
                'id' => $role->id,
                'name' => $role->name,
                'permissions' => $role->permissions->pluck('name'),
            ],
            'permissions' => Permission::all()->pluck('name'),
        ]);
    }

    public function update(Request $request, Role $role)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:roles,name,' . $role->id],
            'permissions' => ['required', 'array'],
            'permissions.*' => ['string', 'exists:permissions,name'],
        ]);

        try {
            $role->update(['name' => $validated['name']]);
            $role->syncPermissions($validated['permissions']);

            return redirect()->route('admin.roles.index')
                ->with('message', 'Role updated successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to update role.'])->withInput();
        }
    }

    public function destroy(Role $role)
    {
        try {
            $role->delete();
            return redirect()->route('admin.roles.index')
                ->with('message', 'Role deleted successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to delete role.']);
        }
    }
}
