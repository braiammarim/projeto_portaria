<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Visitante;

class VisitanteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $visitantes = Visitante::latest()->get();
        return response()->json($visitantes);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required',
            'documento' => 'required',
            'apartamento' => 'required',
            'entrada' => 'required|date',
        ]);
        $visitante = Visitante::create($request->all());
        return response()->json($visitante, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Visitante $visitante)
    {
        return response()->json($visitante);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Visitante $visitante)
    {
        $request->validate([
            'nome' => 'required',
            'documento' => 'required',
            'apartamento' => 'required',
            'entrada' => 'required|date',
        ]);
        $visitante->update($request->all());
        return response()->json($visitante);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Visitante $visitante)
    {
        $visitante->delete();
        return response()->json(null, 204);
    }
}
