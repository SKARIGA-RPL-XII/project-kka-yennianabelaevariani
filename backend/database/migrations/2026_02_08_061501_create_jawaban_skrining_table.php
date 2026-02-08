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
        Schema::create('jawaban_skrining', function (Blueprint $table) {
            $table->id();
            $table->foreignId('skrining_id')
                  ->constrained('skrining')
                  ->cascadeOnDelete();
            $table->foreignId('pertanyaan_id')
                  ->constrained('pertanyaan');
            $table->foreignId('skala_id')
                  ->constrained('skala_jawaban');
            $table->integer('skor');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jawaban_skrining');
    }
};
