<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Buku extends Model
{
    use HasFactory;

    protected $table = 'bukus'; // Menetapkan nama tabel
    protected $primaryKey = 'isbn'; // Menetapkan primary key
    public $incrementing = false; // Menonaktifkan auto-increment jika primary key bukan angka otomatis
    protected $keyType = 'string'; // Tipe primary key sebagai string jika 'isbn' adalah string
    public $timestamps = false; // Menonaktifkan timestamps

    protected $fillable = [
        'isbn',
        'judul',
        'pengarang',
        'tahun',
    ];
}
