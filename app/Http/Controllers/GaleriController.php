<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class GaleriController extends Controller
{
    public function index()
    {
        return Inertia::render('Galeri', []);
    }

    public function show(string $slug)
    {
        $validatedData = [
            'slug' => (string) $slug,
        ];

        return Inertia::render('DetailGaleri', $validatedData);
    }
}
