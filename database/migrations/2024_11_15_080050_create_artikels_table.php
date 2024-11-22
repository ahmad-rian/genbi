<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('artikels', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Judul artikel
            $table->foreignId('author_id')->constrained('users')->onDelete('cascade'); // Relasi ke tabel users
            $table->foreignId('kategori_id')->constrained('kategori_artikels')->onDelete('cascade')->nullable(); // Relasi ke tabel kategori_artikel
            $table->string('slug')->unique(); // URL-friendly slug
            $table->string('thumbnail')->nullable(); // Thumbnail artikel (opsional)
            $table->text('excerpt')->nullable(); // Cuplikan atau ringkasan artikel (opsional)
            $table->text('content'); // Konten artikel
            $table->boolean('is_published')->default(false); // Status publikasi
            $table->timestamp('published_at')->nullable(); // Tanggal publikasi artikel (opsional)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('artikels');
    }
};
