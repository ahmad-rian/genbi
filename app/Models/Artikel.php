<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Artikel extends Model
{
    protected $guarded = ["id"];

    // Relasi ke tabel users (penulis)
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    // Relasi ke tabel kategori_artikel
    public function kategori()
    {
        return $this->belongsTo(KategoriArtikel::class, 'kategori_id');
    }
}
