<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KategoriArtikel extends Model
{
    protected $guarded = ["id"];

    public function artikels()
    {
        return $this->hasMany(Artikel::class, 'kategori_id');
    }
}
