<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class SitemapController extends Controller
{
    public function index()
    {
        // URL API untuk sitemap
        $sitemapUrl = "http://genbi-data.test/api/sitemap.xml";

        // Mengambil data menggunakan file_get_contents
        $xmlContent = file_get_contents($sitemapUrl);

        // Cek jika ada error saat fetch data
        if ($xmlContent === false) {
            return response("Error fetching sitemap data", 500);
        }

        // Menampilkan header XML
        return response($xmlContent, 200)
            ->header('Content-Type', 'application/xml');
    }
}
