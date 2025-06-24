<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visitante extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nome',
        'cpf',
        'telefone',
        'email',
        'apartamento_visitado',
        'motivo_visita',
        'data_entrada',
        'data_saida',
        'observacoes',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'data_entrada' => 'datetime',
        'data_saida' => 'datetime',
    ];

    /**
     * Get the attributes that should be hidden for serialization.
     *
     * @return array<int, string>
     */
    protected function hidden(): array
    {
        return [
            'created_at',
            'updated_at',
        ];
    }
}
