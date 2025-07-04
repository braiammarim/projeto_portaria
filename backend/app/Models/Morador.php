<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Morador extends Model
{
    use HasFactory;

    protected $table = 'moradores';

    protected $fillable = [
        'nome_completo',
        'numero_apartamento',
        'telefone'
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];
} 