<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Struktur extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'struktur';

    protected $fillable = [
        'nama_lengkap',
        'foto',
        'jabatan',
        'universitas',
        'komisariat',
        'quote',
        'periode',
        'is_active',
        'urutan'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'urutan' => 'integer'
    ];

    // Accessor untuk URL foto
    public function getFotoUrlAttribute()
    {
        if (!$this->foto) {
            return null;
        }
        return Storage::disk('public')->url($this->foto);
    }

    // Scope untuk mengurutkan data
    public function scopeOrdered($query)
    {
        return $query->orderBy('urutan')->orderBy('nama_lengkap');
    }

    // Scope untuk filter berdasarkan status
    public function scopeFilterByStatus($query, $status)
    {
        if ($status === 'active') {
            return $query->where('is_active', true);
        } elseif ($status === 'inactive') {
            return $query->where('is_active', false);
        }
        return $query;
    }

    // Scope untuk pencarian
    public function scopeSearch($query, $search)
    {
        if ($search) {
            return $query->where(function ($q) use ($search) {
                $q->where('nama_lengkap', 'like', "%{$search}%")
                    ->orWhere('jabatan', 'like', "%{$search}%")
                    ->orWhere('universitas', 'like', "%{$search}%")
                    ->orWhere('komisariat', 'like', "%{$search}%");
            });
        }
        return $query;
    }
}
