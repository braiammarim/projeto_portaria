<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        
        // Adicionar moradores de exemplo
        $this->call([
            MoradorSeeder::class,
        ]);

        $user = \App\Models\User::updateOrCreate(
            ['email' => 'admin@portariatech.com.br'],
            [
                'name' => 'Administrador',
                'password' => bcrypt('123456')
            ]
        );
    }
}
