<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // Penting kalau kamu pakai API untuk login/regis

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    // 1. Kasih tahu Laravel kalau Primary Key-nya bukan 'id' tapi 'id_user'
    protected $primaryKey = 'id_user';
    public $incrementing = true;
    protected $keyType = 'int';

    /**
     * The attributes that are mass assignable.
     * Sesuaikan dengan kolom-kolom yang ada di migration kamu gess!
     */
    protected $fillable = [
        'nama',           
        'email',
        'password',
        'jenis_kelamin',  
        'tanggal_lahir',  
        'telepon',        
        'role',           
    ];

    /**
     * The attributes that should be hidden for serialization.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'tanggal_lahir' => 'date', // Cast agar format tanggalnya rapi
        ];
    }

    // ini buat ngasih tahu sanctum nya kalau primary key nya itu id_user bukan id
    public function getAuthIdentifierName()
    {
        return 'id_user';
    }
}