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
        Schema::table('jawaban_skrining', function (Blueprint $table) {
        // Tambahkan kolom user_id setelah kolom id
        $table->foreignId('user_id')
              ->nullable() // Gunakan nullable dulu jika tabel sudah ada isinya agar tidak error
              ->after('id') 
              ->constrained('users', 'id_user')
              ->onDelete('cascade');
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jawaban_skrining', function (Blueprint $table) {
        $table->dropForeign(['user_id']);
        $table->dropColumn('user_id');
    });
    }
};
