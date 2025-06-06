<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VisitanteController;

Route::get('/', function () {
    return view('welcome');
});

Route::resource('visitantes', VisitanteController::class);
