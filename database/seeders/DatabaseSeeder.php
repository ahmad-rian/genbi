<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Run Role and Permission seeder first
        $this->call([
            RoleAndPermissionSeeder::class,
            UserSeeder::class,
            KategoriArtikel::class,
        ]);
    }
}
