<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        return Inertia::render('Event', []);
    }


    public function show(string $slug)
    {
        return Inertia::render('DetailEvent', [
            'slug' => (string) $slug,
        ]);
    }
}
