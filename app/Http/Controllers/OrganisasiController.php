<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OrganisasiController extends Controller
{
    public function index()
    {
        return Inertia::render('Organisasi', []);
    }

    public function perKepengurusan(string $periode)
    {
        return Inertia::render('SejarahPerKepengurusan', [
            "periode" => (string) $periode
        ]);
    }

    public function sejarahKepengurusan()
    {
        return Inertia::render('SejarahKepengurusan', []);
    }

    public function detailBidang(string $periode, string $namaBidang)
    {
        $validatedData = [
            'periode' => (string) $periode,
            'namaBidang' => (string) $namaBidang,
        ];

        return Inertia::render('DetailStruktur', $validatedData);
    }
}
