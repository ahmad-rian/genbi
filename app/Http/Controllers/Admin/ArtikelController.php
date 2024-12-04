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

class ArtikelController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Artikel/index', [
            'artikel' => Artikel::with(["author", "kategori"])->latest()->get()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Artikel/create', [
            'kategori' => KategoriArtikel::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|min:5|max:255',
            'content' => 'required',
            'kategori_id' => 'required|exists:kategori_artikels,id',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'excerpt' => 'nullable',
            'is_published' => 'nullable|boolean',
        ]);

        // Mengambil data pengguna yang login
        $user = Auth::user();
        // Mengambil data dan mengupdate artikel
        $data = $request->all();
        $data['author_id'] = $user->id; // Menyimpan ID user yang sedang login sebagai author
        $data['slug'] = Str::slug($request->title); // Update slug jika judul diubah

        // Jika ada file thumbnail yang di-upload
        if ($request->hasFile('thumbnail')) {
            // Validasi dan proses upload gambar
            $file = $request->file('thumbnail');
            $fileName = uniqid() . '-' . $file->getClientOriginalName(); // Menambahkan waktu agar nama file unik
            $path = $file->storeAs('thumbnailArtikel', $fileName, 'public'); // Menyimpan file ke storage public

            // Menyimpan path gambar ke dalam data artikel
            $data['thumbnail'] = $fileName;
        }

        Artikel::create($data);


        // Redirect setelah menyimpan artikel
        return redirect()->route('admin.artikel.index')->with('success', 'Artikel berhasil ditambahkan!');
    }

    // Method untuk mengedit artikel (optional, jika ingin membuat fitur edit)
    public function edit(Artikel $artikel)
    {
        return Inertia::render('Admin/Artikel/edit', [
            'artikel' => $artikel,
            'kategori' => KategoriArtikel::all()
        ]);
    }

    // Method untuk mengupdate artikel (optional, jika ingin membuat fitur update)
    public function update(Request $request, Artikel $artikel)
    {
        $request->validate([
            'title' => 'min:5|max:255',
            'content' => 'min:200',
            'kategori_id' => 'min:1|exists:kategori_artikels,id',
            'excerpt' => 'nullable',
            'is_published' => 'nullable|boolean',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Mengambil data dan mengupdate artikel
        $data = $request->all();

        // Cek apakah judul diubah
        if ($request->filled('title') && $artikel->title !== $request->title) {
            $data['slug'] = Str::slug($request->title); // Update slug hanya jika judul berubah
        } else {
            $data['slug'] = $artikel->slug; // Pertahankan slug lama jika judul tidak berubah
        }


        // Jika ada file thumbnail yang di-upload
        dd($request);
        if ($request->file('thumbnail')) {
            dd("JANCOK");

            $request->validate([
                'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            // Menghapus thumbnail lama (jika ada)
            if ($artikel->thumbnail) {
                Storage::delete('public/storage/thumbnailArtikel' . $artikel->thumbnail);
            }

            // Validasi dan proses upload gambar
            $file = $request->file('thumbnail');
            $fileName = uniqid() . '-' . $file->getClientOriginalName(); // Menambahkan waktu agar nama file unik
            $path = $file->storeAs('thumbnailArtikel', $fileName, 'public'); // Menyimpan file ke storage public

            // Menyimpan path gambar ke dalam data artikel
            $data['thumbnail'] = $fileName;

            // Update artikel
            $artikel->update($data);
        }else{
            // Update artikel
            $artikel->update($data);
        }


        return redirect()->route('admin.artikel.index')->with('success', 'Artikel berhasil diperbarui!');
    }

    // Method untuk menghapus artikel
    public function destroy(Artikel $artikel)
    {
        // Menghapus thumbnail yang di-upload (jika ada)
        if ($artikel->thumbnail) {
            Storage::delete('public/' . $artikel->thumbnail);
        }

        // Menghapus artikel dari database
        $artikel->delete();

        return redirect()->route('admin.artikel.index')->with('success', 'Artikel berhasil dihapus!');
    }
}
