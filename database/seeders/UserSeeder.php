<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'type' => 'admin',
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('admin');

        // Create Operator
        $operator = User::create([
            'name' => 'Operator User',
            'email' => 'operator@example.com',
            'password' => Hash::make('password'),
            'type' => 'operator',
            'email_verified_at' => now(),
        ]);
        $operator->assignRole('operator');

        // Create Regular User
        $user = User::create([
            'name' => 'Regular User',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'type' => 'user',
            'email_verified_at' => now(),
        ]);
        $user->assignRole('user');
    }
}
