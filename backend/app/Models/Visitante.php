<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Visitante extends Model
{
    protected $fillable = ['nome', 'documento', 'apartamento', 'entrada', 'saida'];

    //
}
