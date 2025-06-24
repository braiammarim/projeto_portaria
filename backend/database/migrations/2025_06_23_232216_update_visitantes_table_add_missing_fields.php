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
        Schema::table('visitantes', function (Blueprint $table) {
            // Adicionar campos que podem não existir
            if (!Schema::hasColumn('visitantes', 'cpf')) {
                if (Schema::hasColumn('visitantes', 'documento')) {
                    $table->renameColumn('documento', 'cpf');
                } else {
                    $table->string('cpf', 14)->unique()->after('nome');
                }
            }
            if (!Schema::hasColumn('visitantes', 'telefone')) {
                $table->string('telefone', 15)->after('cpf');
            }
            if (!Schema::hasColumn('visitantes', 'email')) {
                $table->string('email', 100)->nullable()->after('telefone');
            }
            if (!Schema::hasColumn('visitantes', 'apartamento_visitado')) {
                if (Schema::hasColumn('visitantes', 'apartamento')) {
                    $table->renameColumn('apartamento', 'apartamento_visitado');
                } else {
                    $table->string('apartamento_visitado', 10)->after('email');
                }
            }
            if (!Schema::hasColumn('visitantes', 'motivo_visita')) {
                $table->string('motivo_visita', 50)->after('apartamento_visitado');
            }
            if (!Schema::hasColumn('visitantes', 'data_entrada')) {
                if (Schema::hasColumn('visitantes', 'entrada')) {
                    $table->renameColumn('entrada', 'data_entrada');
                } else {
                    $table->datetime('data_entrada')->after('motivo_visita');
                }
            }
            if (!Schema::hasColumn('visitantes', 'data_saida')) {
                if (Schema::hasColumn('visitantes', 'saida')) {
                    $table->renameColumn('saida', 'data_saida');
                } else {
                    $table->datetime('data_saida')->nullable()->after('data_entrada');
                }
            }
            if (!Schema::hasColumn('visitantes', 'observacoes')) {
                $table->text('observacoes')->nullable()->after('data_saida');
            }
            if (!Schema::hasColumn('visitantes', 'status')) {
                $table->enum('status', ['Ativo', 'Finalizado', 'Cancelado'])->default('Ativo')->after('observacoes');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('visitantes', function (Blueprint $table) {
            // Remover campos adicionados
            $drop = [];
            if (Schema::hasColumn('visitantes', 'cpf')) $drop[] = 'cpf';
            if (Schema::hasColumn('visitantes', 'telefone')) $drop[] = 'telefone';
            if (Schema::hasColumn('visitantes', 'email')) $drop[] = 'email';
            if (Schema::hasColumn('visitantes', 'apartamento_visitado')) $drop[] = 'apartamento_visitado';
            if (Schema::hasColumn('visitantes', 'motivo_visita')) $drop[] = 'motivo_visita';
            if (Schema::hasColumn('visitantes', 'data_entrada')) $drop[] = 'data_entrada';
            if (Schema::hasColumn('visitantes', 'data_saida')) $drop[] = 'data_saida';
            if (Schema::hasColumn('visitantes', 'observacoes')) $drop[] = 'observacoes';
            if (Schema::hasColumn('visitantes', 'status')) $drop[] = 'status';
            if (count($drop)) $table->dropColumn($drop);
        });
    }
};
