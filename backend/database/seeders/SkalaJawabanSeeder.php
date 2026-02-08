<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SkalaJawabanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         DB::table('skala_jawaban')->insert([
            ['label' => 'Tidak Pernah', 'nilai' => 0],
            ['label' => 'Jarang', 'nilai' => 1],
            ['label' => 'Sering', 'nilai' => 2],
            ['label' => 'Selalu', 'nilai' => 3],
        ]);
    }
}
