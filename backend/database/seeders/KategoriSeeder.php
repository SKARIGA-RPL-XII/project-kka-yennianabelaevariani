<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class KategoriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
          DB::table('kategori')->insert([
            ['kode' => 'PER', 'nama' => 'Pernapasan', 'deskripsi' => 'Sistem pernapasan'],
            ['kode' => 'KAR', 'nama' => 'Kardiovaskular', 'deskripsi' => 'Jantung dan pembuluh darah'],
            ['kode' => 'CER', 'nama' => 'Pencernaan', 'deskripsi' => 'Sistem pencernaan'],
            ['kode' => 'SAR', 'nama' => 'Saraf', 'deskripsi' => 'Sistem saraf'],
            ['kode' => 'UMU', 'nama' => 'Umum', 'deskripsi' => 'Kondisi umum tubuh'],
        ]);
    }
}
