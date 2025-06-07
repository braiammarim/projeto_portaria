@extends('layouts.app')

@section('content')
<div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-4">Editar Entrega</h1>
    <form action="{{ route('entregas.update', $entrega) }}" method="POST">
        @csrf
        @method('PUT')
        <div class="mb-4">
            <label for="descricao" class="block text-gray-700 text-sm font-bold mb-2">Descrição</label>
            <input type="text" name="descricao" id="descricao" value="{{ $entrega->descricao }}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
        </div>
        <div class="mb-4">
            <label for="status" class="block text-gray-700 text-sm font-bold mb-2">Status</label>
            <input type="text" name="status" id="status" value="{{ $entrega->status }}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
        </div>
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Atualizar</button>
    </form>
</div>
@endsection 