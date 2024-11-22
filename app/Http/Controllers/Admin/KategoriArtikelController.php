<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Artikel;
use App\Models\KategoriArtikel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;
use Inertia\Inertia;
use Illuminate\Support\Str;

class KategoriArtikelController extends Controller
{
     public function index(): Response
    {
        return Inertia::render('Admin/Kategori Artikel/index', [
            'kategoriArtikel' => KategoriArtikel::latest()->get()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Kategori Artikel/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|max:255',
            'deskripsi' => 'required',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Mengambil data dan mengupdate artikel
        $data = $request->all();


        // Jika ada file thumbnail yang di-upload
        if ($request->hasFile('thumbnail')) {
            // Validasi dan proses upload gambar
            $file = $request->file('thumbnail');
            $fileName = time() . '-' . $file->getClientOriginalName(); // Menambahkan waktu agar nama file unik
            $path = $file->storeAs('Thumbnail Kategori Artikel', $fileName, 'public'); // Menyimpan file ke storage public

            // Menyimpan path gambar ke dalam data artikel
            $data['thumbnail'] = $fileName;
        }

        KategoriArtikel::create($data);


        // Redirect setelah menyimpan artikel
        return redirect()->route('admin.kategori-artikel.index')->with('success', 'Kategori Artikel berhasil ditambahkan!');
    }

    // Method untuk mengedit artikel (optional, jika ingin membuat fitur edit)
    public function edit(KategoriArtikel $kategoriArtikel)
    {
        return Inertia::render('Admin/Kategori Artikel/edit', [
            'kategoriArtikel' => $kategoriArtikel,
        ]);
    }

    // Method untuk mengupdate artikel (optional, jika ingin membuat fitur update)
    public function update(Request $request, KategoriArtikel $kategoriArtikel)
    {
        $request->validate([
            'nama' => 'required|max:255',
            'deskripsi' => 'required',
        ]);

        // Mengambil data dan mengupdate artikel
        $data = $request->all();

        dd($request->hasFile('thumbnail'));
        // Jika ada file thumbnail yang di-upload
        if (!$request->hasFile('thumbnail')) {

            $request->validate([
                'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            // Menghapus thumbnail lama (jika ada)
            if ($kategoriArtikel->thumbnail) {
                Storage::delete('public/storage/Thumbnail Kategori Artikel' . $kategoriArtikel->thumbnail);
            }

            // Validasi dan proses upload gambar
            $file = $request->file('thumbnail');
            $fileName = time() . '-' . $file->getClientOriginalName(); // Menambahkan waktu agar nama file unik
            $path = $file->storeAs('Thumbnail Kategori Artikel', $fileName, 'public'); // Menyimpan file ke storage public

            // Menyimpan path gambar ke dalam data artikel
            $data['thumbnail'] = $fileName;
        }


        // Update artikel
        $kategoriArtikel->update($data);

        return redirect()->route('admin.kategori-artikel.index')->with('success', 'Kategori Artikel berhasil diperbarui!');
    }

    // Method untuk menghapus artikel
    public function destroy(KategoriArtikel $kategoriArtikel)
    {
        // Menghapus thumbnail yang di-upload (jika ada)
        if ($kategoriArtikel->thumbnail) {
            Storage::delete('public/' . $artikel->thumbnail);
        }

        // Menghapus artikel dari database
        $kategoriArtikel->delete();

        return redirect()->route('admin.artikel.index')->with('success', 'Kategori Artikel berhasil dihapus!');
    }
}
