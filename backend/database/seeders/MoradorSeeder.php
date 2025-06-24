<?php

namespace Database\Seeders;

use App\Models\Morador;
use Illuminate\Database\Seeder;

class MoradorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $moradores = [
            [
                'nome_completo' => 'João Silva Santos',
                'numero_apartamento' => '101',
                'telefone' => '(11) 91234-5678'
            ],
            [
                'nome_completo' => 'Maria Oliveira Costa',
                'numero_apartamento' => '102',
                'telefone' => '(11) 92345-6789'
            ],
            [
                'nome_completo' => 'Pedro Almeida Lima',
                'numero_apartamento' => '201',
                'telefone' => '(11) 93456-7890'
            ],
            [
                'nome_completo' => 'Ana Paula Ferreira',
                'numero_apartamento' => '202',
                'telefone' => '(11) 94567-8901'
            ],
            [
                'nome_completo' => 'Carlos Eduardo Rodrigues',
                'numero_apartamento' => '301',
                'telefone' => '(11) 95678-9012'
            ],
            [
                'nome_completo' => 'Fernanda Souza Martins',
                'numero_apartamento' => '302',
                'telefone' => '(11) 96789-0123'
            ],
            [
                'nome_completo' => 'Roberto Nascimento',
                'numero_apartamento' => '401',
                'telefone' => '(11) 97890-1234'
            ],
            [
                'nome_completo' => 'Lucia Mendes Pereira',
                'numero_apartamento' => '402',
                'telefone' => '(11) 98901-2345'
            ]
        ];

        foreach ($moradores as $morador) {
            Morador::create($morador);
        }
    }
} 