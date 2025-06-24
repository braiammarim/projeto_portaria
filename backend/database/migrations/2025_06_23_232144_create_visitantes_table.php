<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Schema::create('visitantes', function (Blueprint $table) {
        //     $table->id();
        //     $table->string('nome', 100);
        //     $table->string('cpf', 14)->unique();
        //     $table->string('telefone', 15);
        //     $table->string('email', 100)->nullable();
        //     $table->string('apartamento_visitado', 10);
        //     $table->string('motivo_visita', 50);
        //     $table->datetime('data_entrada');
        //     $table->datetime('data_saida')->nullable();
        //     $table->text('observacoes')->nullable();
        //     $table->enum('status', ['Ativo', 'Finalizado', 'Cancelado'])->default('Ativo');
        //     $table->timestamps();
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Schema::dropIfExists('visitantes');
    }
};
