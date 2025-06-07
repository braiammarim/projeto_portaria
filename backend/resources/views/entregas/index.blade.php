@extends('layouts.app')

@section('content')
<div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-4">Entregas</h1>
    <a href="{{ route('entregas.create') }}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block">Nova Entrega</a>
    <div class="bg-white shadow-md rounded my-6">
        <table class="min-w-full">
            <thead>
                <tr>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Descrição</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ações</th>
                </tr>
            </thead>
            <tbody>
                @foreach($entregas as $entrega)
                <tr>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{{ $entrega->id }}</td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{{ $entrega->descricao }}</td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{{ $entrega->status }}</td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                        <a href="{{ route('entregas.show', $entrega) }}" class="text-indigo-600 hover:text-indigo-900 mr-3">Ver</a>
                        <a href="{{ route('entregas.edit', $entrega) }}" class="text-yellow-600 hover:text-yellow-900 mr-3">Editar</a>
                        <form action="{{ route('entregas.destroy', $entrega) }}" method="POST" class="inline">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="text-red-600 hover:text-red-900">Excluir</button>
                        </form>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>
@endsection 