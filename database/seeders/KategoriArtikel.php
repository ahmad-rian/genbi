<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KategoriArtikel extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('kategori_artikels')->insert([
            [
                'id' => 1,
                'nama' => 'Teknologi',
                'thumbnail' => 'thumbnail_teknologi.jpg',
                'deskripsi' => 'Artikel yang membahas berbagai topik tentang teknologi terbaru dan inovasi.',
            ],
            [
                'id' => 2,
                'nama' => 'Ekonomi',
                'thumbnail' => 'thumbnail_ekonomi.jpg',
                'deskripsi' => 'Artikel yang membahas perkembangan ekonomi global dan lokal, termasuk kebijakan fiskal dan moneter.',
            ],
            [
                'id' => 3,
                'nama' => 'Kesehatan',
                'thumbnail' => 'thumbnail_kesehatan.jpg',
                'deskripsi' => 'Artikel yang memberikan informasi seputar gaya hidup sehat, tips kebugaran, dan perawatan tubuh.',
            ],
            [
                'id' => 4,
                'nama' => 'Pendidikan',
                'thumbnail' => 'thumbnail_pendidikan.jpg',
                'deskripsi' => 'Artikel yang berfokus pada dunia pendidikan, termasuk metode pembelajaran dan perkembangan kurikulum.',
            ],
            [
                'id' => 5,
                'nama' => 'Sosial',
                'thumbnail' => 'thumbnail_sosial.jpg',
                'deskripsi' => 'Artikel yang membahas isu-isu sosial, termasuk masalah kemiskinan, ketidaksetaraan, dan keadilan sosial.',
            ],
        ]);
    }
}
