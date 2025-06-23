<?php

namespace App\Http\Controllers;

use App\Models\Morador;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MoradorController extends Controller
{
    /**
     * Listar todos os moradores
     */
    public function index(): JsonResponse
    {
        \Log::info('TESTE DE LOG INDEX');
        $moradores = Morador::orderBy('nome_completo')->get();
        return response()->json($moradores);
    }

    /**
     * Buscar morador por ID
     */
    public function show($id): JsonResponse
    {
        $morador = Morador::find($id);
        
        if (!$morador) {
            return response()->json(['message' => 'Morador não encontrado'], 404);
        }
        
        return response()->json($morador);
    }

    /**
     * Buscar morador por nome, apartamento ou telefone
     */
    public function buscar(Request $request): JsonResponse
    {
        \Log::info('TESTE DE LOG BUSCAR');
        \Log::info('ENTROU NO MÉTODO BUSCAR', [
            'params' => $request->all()
        ]);

        $query = $request->get('q');
        $tipo = $request->get('tipo', 'nome'); // nome, apartamento, telefone

        if (!$query) {
            return response()->json(['message' => 'Parâmetro de busca é obrigatório'], 400);
        }

        $morador = Morador::where(function($qBuilder) use ($query, $tipo) {
            switch ($tipo) {
                case 'apartamento':
                    $queryLimpo = preg_replace('/\s+/', '', $query);
                    $qBuilder->whereRaw('REPLACE(numero_apartamento, " ", "") = ?', [$queryLimpo]);
                    break;
                case 'telefone':
                    $queryNumeros = preg_replace('/\D/', '', $query);
                    $qBuilder->whereRaw('REPLACE(telefone, " ", "") LIKE ?', ["%$queryNumeros"]);
                    break;
                default:
                    $qBuilder->where('nome_completo', 'LIKE', "%{$query}%");
            }
        })->first();

        if (!$morador) {
            \Log::info('Nenhum morador encontrado para:', [
                'tipo' => $tipo,
                'q' => $query,
            ]);
            return response()->json(['message' => 'Morador não encontrado'], 404);
        }
        return response()->json($morador);
    }

    /**
     * Criar novo morador
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'nome_completo' => 'required|string|max:255',
            'numero_apartamento' => 'required|string|max:50',
            'telefone' => 'required|string|max:20'
        ]);
        
        $morador = Morador::create($request->all());
        
        return response()->json($morador, 201);
    }

    /**
     * Atualizar morador
     */
    public function update(Request $request, $id): JsonResponse
    {
        $morador = Morador::find($id);
        
        if (!$morador) {
            return response()->json(['message' => 'Morador não encontrado'], 404);
        }
        
        $request->validate([
            'nome_completo' => 'required|string|max:255',
            'numero_apartamento' => 'required|string|max:50',
            'telefone' => 'required|string|max:20'
        ]);
        
        $morador->update($request->all());
        
        return response()->json($morador);
    }

    /**
     * Deletar morador
     */
    public function destroy($id): JsonResponse
    {
        $morador = Morador::find($id);
        
        if (!$morador) {
            return response()->json(['message' => 'Morador não encontrado'], 404);
        }
        
        $morador->delete();
        
        return response()->json(['message' => 'Morador deletado com sucesso']);
    }
} 