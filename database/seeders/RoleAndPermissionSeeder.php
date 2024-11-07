<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleAndPermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create Permissions for users
        $userPermissions = [
            'users' => ['view', 'create', 'edit', 'delete'],
            'profiles' => ['view', 'edit'],
            'settings' => ['view', 'edit'],
        ];

        $allPermissions = [];

        foreach ($userPermissions as $module => $actions) {
            foreach ($actions as $action) {
                $permissionName = $action . '-' . $module;
                Permission::create(['name' => $permissionName]);
                $allPermissions[] = $permissionName;
            }
        }

        // Create Roles
        // 1. Admin Role
        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo($allPermissions);

        // 2. Operator Role
        $operatorRole = Role::create(['name' => 'operator']);
        $operatorRole->givePermissionTo([
            'view-users',
            'edit-users',
            'view-profiles',
            'edit-profiles',
            'view-settings'
        ]);

        // 3. User Role
        $userRole = Role::create(['name' => 'user']);
        $userRole->givePermissionTo([
            'view-profiles',
            'edit-profiles'
        ]);
    }
}
