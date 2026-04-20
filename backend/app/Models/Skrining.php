<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skrining extends Model
{
    protected $table = 'skrining'; // Beritahu Laravel nama tabelnya
    protected $guarded = [];       // Izinkan semua kolom diisi untuk keperluan TA
}