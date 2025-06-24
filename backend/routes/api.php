<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MoradorController;
use App\Http\Controllers\VisitanteController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| registrar rotas de API para sua aplicação. Essas
| rotas são carregadas pelo RouteServiceProvider e todas elas serão
| atribuídas ao grupo de middleware "api".
|
*/

// Rota de teste
Route::get('/test', function () {
    return response()->json(['message' => 'API funcionando!']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Rotas de autenticação
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

// Rotas para Moradores
Route::post('/moradores', [MoradorController::class, 'store']);
Route::put('/moradores/{id}', [MoradorController::class, 'update']);
Route::delete('/moradores/{id}', [MoradorController::class, 'destroy']);
Route::get('/moradores/buscar', [MoradorController::class, 'buscar']);

// Rotas para Visitantes
Route::apiResource('visitantes', VisitanteController::class); 