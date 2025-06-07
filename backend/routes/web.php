<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VisitanteController;
use App\Http\Controllers\EntregaController;

Route::get('/', function () {
    return view('welcome');
});

Route::resource('visitantes', VisitanteController::class);

Route::get('/entregas', 'EntregaController@index')->name('entregas.index');
Route::get('/entregas/create', 'EntregaController@create')->name('entregas.create');
Route::post('/entregas', 'EntregaController@store')->name('entregas.store');
Route::get('/entregas/{entrega}', 'EntregaController@show')->name('entregas.show');
Route::get('/entregas/{entrega}/edit', 'EntregaController@edit')->name('entregas.edit');
Route::put('/entregas/{entrega}', 'EntregaController@update')->name('entregas.update');
Route::delete('/entregas/{entrega}', 'EntregaController@destroy')->name('entregas.destroy');
