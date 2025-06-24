<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Visitante;

class VisitanteController extends Controller
{
    /**
     * Listar todos os visitantes
     */
    public function index()
    {
        $visitantes = Visitante::orderBy('created_at', 'desc')->get();
        return response()->json($visitantes);
    }

    /**
     * Mostrar formulário de criação
     */
    public function create()
    {
        return response()->json(['message' => 'Formulário de criação']);
    }

    /**
     * Salvar novo visitante
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|min:3|max:100',
            'cpf' => 'required|string|max:14|unique:visitantes,cpf',
            'telefone' => 'required|string|max:15',
            'email' => 'nullable|email|max:100',
            'apartamento_visitado' => 'required|string|max:10',
            'motivo_visita' => 'nullable|string|max:50',
            'data_entrada' => 'required|date',
            'observacoes' => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Dados inválidos',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $visitante = Visitante::create($request->all());
            
            return response()->json([
                'success' => true,
                'message' => 'Visitante cadastrado com sucesso',
                'visitante' => $visitante
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao cadastrar visitante'
            ], 500);
        }
    }

    /**
     * Mostrar visitante específico
     */
    public function show($id)
    {
        $visitante = Visitante::find($id);
        
        if (!$visitante) {
            return response()->json([
                'success' => false,
                'message' => 'Visitante não encontrado'
            ], 404);
        }

        return response()->json($visitante);
    }

    /**
     * Mostrar formulário de edição
     */
    public function edit($id)
    {
        $visitante = Visitante::find($id);
        
        if (!$visitante) {
            return response()->json([
                'success' => false,
                'message' => 'Visitante não encontrado'
            ], 404);
        }

        return response()->json($visitante);
    }

    /**
     * Atualizar visitante
     */
    public function update(Request $request, $id)
    {
        $visitante = Visitante::find($id);
        
        if (!$visitante) {
            return response()->json([
                'success' => false,
                'message' => 'Visitante não encontrado'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|min:3|max:100',
            'cpf' => 'required|string|max:14|unique:visitantes,cpf,' . $id,
            'telefone' => 'required|string|max:15',
            'email' => 'nullable|email|max:100',
            'apartamento_visitado' => 'required|string|max:10',
            'motivo_visita' => 'nullable|string|max:50',
            'observacoes' => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Dados inválidos',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $visitante->update($request->all());
            
            return response()->json([
                'success' => true,
                'message' => 'Visitante atualizado com sucesso',
                'visitante' => $visitante
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao atualizar visitante'
            ], 500);
        }
    }

    /**
     * Excluir visitante
     */
    public function destroy($id)
    {
        $visitante = Visitante::find($id);
        
        if (!$visitante) {
            return response()->json([
                'success' => false,
                'message' => 'Visitante não encontrado'
            ], 404);
        }

        try {
            $visitante->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Visitante excluído com sucesso'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao excluir visitante'
            ], 500);
        }
    }
}
