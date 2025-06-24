<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MoradorController;
use App\Http\Controllers\VisitanteController;
// use App\Http\Controllers\EntregaController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/entregas', 'EntregaController@index')->name('entregas.index');
// Route::get('/entregas/create', 'EntregaController@create')->name('entregas.create');
// Route::post('/entregas', 'EntregaController@store')->name('entregas.store');
// Route::get('/entregas/{entrega}', 'EntregaController@show')->name('entregas.show');
// Route::get('/entregas/{entrega}/edit', 'EntregaController@edit')->name('entregas.edit');
// Route::put('/entregas/{entrega}', 'EntregaController@update')->name('entregas.update');
// Route::delete('/entregas/{entrega}', 'EntregaController@destroy')->name('entregas.destroy');

Route::get('/', function () {
    return view('welcome');
});

Route::resource('moradores', MoradorController::class);
Route::resource('visitantes', VisitanteController::class);

// Rotas para Moradores
Route::prefix('api')->group(function () {
    Route::post('/moradores', [MoradorController::class, 'store']);
    Route::put('/moradores/{id}', [MoradorController::class, 'update']);
    Route::delete('/moradores/{id}', [MoradorController::class, 'destroy']);
    Route::get('/moradores/buscar', [MoradorController::class, 'buscar']);
    
});
