<?php

namespace App\Http\Controllers;

use App\Models\Entrega;
use Illuminate\Http\Request;

class EntregaController extends Controller
{
    public function index()
    {
        $entregas = Entrega::all();
        return view('entregas.index', compact('entregas'));
    }

    public function create()
    {
        return view('entregas.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'descricao' => 'required|string|max:255',
            'status' => 'required|string|max:50',
        ]);

        Entrega::create($validated);
        return redirect()->route('entregas.index')->with('success', 'Entrega criada com sucesso.');
    }

    public function show(Entrega $entrega)
    {
        return view('entregas.show', compact('entrega'));
    }

    public function edit(Entrega $entrega)
    {
        return view('entregas.edit', compact('entrega'));
    }

    public function update(Request $request, Entrega $entrega)
    {
        $validated = $request->validate([
            'descricao' => 'required|string|max:255',
            'status' => 'required|string|max:50',
        ]);

        $entrega->update($validated);
        return redirect()->route('entregas.index')->with('success', 'Entrega atualizada com sucesso.');
    }

    public function destroy(Entrega $entrega)
    {
        $entrega->delete();
        return redirect()->route('entregas.index')->with('success', 'Entrega excluída com sucesso.');
    }
} 