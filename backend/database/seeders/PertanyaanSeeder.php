<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; 

class PertanyaanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kategori = DB::table('kategori')->pluck('id', 'kode');

        $data = [
            // PERNAPASAN
            ['PER', 'Apakah Anda mengalami batuk?', 1, false],
            ['PER', 'Apakah Anda mengalami batuk lebih dari 3 hari?', 2, false],
            ['PER', 'Apakah Anda sesak napas saat aktivitas ringan?', 2, false],
            ['PER', 'Apakah Anda sesak napas saat istirahat?', 3, false],
            ['PER', 'Apakah napas Anda berbunyi saat bernapas?', 2, false],
            ['PER', 'Apakah dada terasa nyeri saat bernapas?', 3, false],
            ['PER', 'Apakah Anda mengalami kesulitan bernapas berat?', 4, true],

        //     // PENCERNAAN
        //     ['CER', 'Apakah Anda sering merasa mual?', 1, false],
        //     ['CER', 'Apakah Anda mengalami muntah?', 2, false],
        //     ['CER', 'Apakah Anda mengalami nyeri perut?', 2, false],
        //     ['CER', 'Apakah Anda mengalami diare?', 2, false],
        //     ['CER', 'Apakah nafsu makan Anda menurun?', 1, false],
        //     ['CER', 'Apakah nyeri perut terasa sangat hebat?', 3, false],
        //     ['CER', 'Apakah Anda muntah darah atau BAB hitam?', 4, true],

        //     // KARDIOVASKULAR
        //     ['KAR', 'Apakah jantung Anda sering berdebar?', 2, false],
        //     ['KAR', 'Apakah Anda pusing saat berdiri?', 1, false],
        //     ['KAR', 'Apakah Anda mudah lelah?', 1, false],
        //     ['KAR', 'Apakah Anda merasakan nyeri dada?', 3, false],
        //     ['KAR', 'Apakah Anda sesak napas saat aktivitas?', 2, false],
        //     ['KAR', 'Apakah kaki Anda sering bengkak?', 2, false],
        //     ['KAR', 'Apakah nyeri dada terasa berat atau menjalar?', 4, true],

        //     // SARAF
        //     ['SAR', 'Apakah Anda sering sakit kepala?', 1, false],
        //     ['SAR', 'Apakah Anda merasa pusing berputar?', 2, false],
        //     ['SAR', 'Apakah Anda sering kesemutan?', 1, false],
        //     ['SAR', 'Apakah Anda sulit berkonsentrasi?', 1, false],
        //     ['SAR', 'Apakah Anda mengalami kelemahan tangan atau kaki?', 3, false],
        //     ['SAR', 'Apakah bicara atau penglihatan Anda terganggu?', 3, false],
        //     ['SAR', 'Apakah Anda mengalami kejang atau pingsan?', 4, true],

        //     // UMUM
        //     ['UMU', 'Apakah Anda mengalami demam ringan?', 1, false],
        //     ['UMU', 'Apakah Anda mengalami demam tinggi?', 3, false],
        //     ['UMU', 'Apakah Anda merasa sangat lelah?', 1, false],
        //     ['UMU', 'Apakah Anda menggigil?', 2, false],
        //     ['UMU', 'Apakah tubuh terasa nyeri?', 1, false],
        //     ['UMU', 'Apakah berat badan Anda turun tanpa sebab?', 2, false],
        //     ['UMU', 'Apakah Anda mengalami penurunan kesadaran?', 4, true],
        ];

        foreach ($data as [$kode, $teks, $bobot, $darurat]) {
            DB::table('pertanyaan')->insert([
                'kategori_id' => $kategori[$kode],
                'teks_pertanyaan' => $teks,
                'bobot' => $bobot,
                'is_darurat' => $darurat,
            ]);
        }
    
    }
}
