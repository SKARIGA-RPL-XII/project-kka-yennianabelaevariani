<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JawabanSkrining extends Model
{
    // Beritahu Laravel nama tabel aslinya di database
    protected $table = 'jawaban_skrining'; 

    // Izinkan semua kolom diisi (biar nggak kena Mass Assignment Error)
    protected $guarded = []; 
}