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
        Schema::create('skrining', function (Blueprint $table) {
            $table->id(); 
            
            $table->foreignId('user_id')
                  ->references('id_user')
                  ->on('users')
                  ->onDelete('cascade');
                  
            $table->integer('total_skor')->default(0);
            $table->enum('status', ['rendah', 'sedang', 'tinggi']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skrining');
    }
};