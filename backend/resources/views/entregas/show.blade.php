@extends('layouts.app')

@section('content')
<div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-4">Detalhes da Entrega</h1>
    <div class="bg-white shadow-md rounded p-6">
        <p><strong>ID:</strong> {{ $entrega->id }}</p>
        <p><strong>Descrição:</strong> {{ $entrega->descricao }}</p>
        <p><strong>Status:</strong> {{ $entrega->status }}</p>
        <p><strong>Criado em:</strong> {{ $entrega->created_at }}</p>
        <p><strong>Atualizado em:</strong> {{ $entrega->updated_at }}</p>
    </div>
    <a href="{{ route('entregas.index') }}" class="mt-4 inline-block bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Voltar</a>
</div>
@endsection 