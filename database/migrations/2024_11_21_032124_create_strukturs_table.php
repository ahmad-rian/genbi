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
        Schema::create('strukturs', function (Blueprint $table) {
            $table->id();
            $table->string('nama_lengkap', 255);
            $table->string('foto')->nullable();
            $table->string('jabatan', 255);
            $table->string('universitas', 255);
            $table->string('komisariat', 255);
            $table->text('quote')->nullable();
            $table->string('periode', 255)->nullable();
            $table->boolean('is_active');
            $table->integer('urutan')->unsigned();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('strukturs');
    }
};
