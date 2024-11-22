<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Struktur;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class StrukturController extends Controller
{
    public function index(): Response
    {
        $struktur = Struktur::query()
            ->when(request('search'), function ($query, $search) {
                $query->search($search);
            })
            ->when(request('status'), function ($query, $status) {
                $query->filterByStatus($status);
            })
            ->get()
            ->map(function ($item) {
                return [
                    ...$item->toArray(),
                    'foto_url' => $item->foto_url
                ];
            });

        return Inertia::render('Admin/Struktur/Index', [
            'struktur' => $struktur,
            'filters' => request()->all(['search', 'status'])
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Struktur/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'jabatan' => 'required|string|max:255',
            'universitas' => 'required|string|max:255',
            'komisariat' => 'required|string|max:255',
            'quote' => 'nullable|string',
            'periode' => 'nullable|string|max:255',
            'is_active' => 'required|boolean',
            'urutan' => 'required|integer|min:0',
        ]);

        try {
            $data = $request->except('foto');

            if ($request->hasFile('foto')) {
                $file = $request->file('foto');
                $fileName = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();

                Storage::disk('public')->makeDirectory('struktur');
                $path = $file->storeAs('struktur', $fileName, 'public');
                $data['foto'] = $path;

                Log::info('File uploaded:', [
                    'path' => $path,
                    'exists' => Storage::disk('public')->exists($path)
                ]);
            }

            Struktur::create($data);

            return redirect()->route('admin.struktur')
                ->with('success', 'Data struktur berhasil ditambahkan');
        } catch (\Exception $e) {
            Log::error('Error saving struktur:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            if (isset($path)) {
                Storage::disk('public')->delete($path);
            }

            return back()->withErrors([
                'error' => 'Gagal menyimpan data struktur: ' . $e->getMessage()
            ]);
        }
    }

    public function edit(Struktur $struktur): Response
    {
        return Inertia::render('Admin/Struktur/Edit', [
            'struktur' => [
                ...$struktur->toArray(),
                'foto_url' => $struktur->foto_url
            ]
        ]);
    }

    public function update(Request $request, Struktur $struktur)
    {
        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'jabatan' => 'required|string|max:255',
            'universitas' => 'required|string|max:255',
            'komisariat' => 'required|string|max:255',
            'quote' => 'nullable|string',
            'periode' => 'nullable|string|max:255',
            'is_active' => 'required|boolean',
            'urutan' => 'required|integer|min:0',
        ]);

        try {
            $data = $request->except('foto');

            if ($request->hasFile('foto')) {
                $file = $request->file('foto');
                $fileName = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();

                Storage::disk('public')->makeDirectory('struktur');
                $path = $file->storeAs('struktur', $fileName, 'public');

                if ($struktur->foto) {
                    Storage::disk('public')->delete($struktur->foto);
                }

                $data['foto'] = $path;
            }

            $struktur->update($data);

            return redirect()->route('admin.struktur')
                ->with('success', 'Data struktur berhasil diperbarui');
        } catch (\Exception $e) {
            Log::error('Error updating struktur:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            if (isset($path)) {
                Storage::disk('public')->delete($path);
            }

            return back()->withErrors([
                'error' => 'Gagal memperbarui data struktur: ' . $e->getMessage()
            ]);
        }
    }

    public function destroy(Struktur $struktur)
    {
        try {
            if ($struktur->foto) {
                Storage::disk('public')->delete($struktur->foto);
            }

            $struktur->delete();

            return redirect()->route('admin.struktur')
                ->with('success', 'Data struktur berhasil dihapus');
        } catch (\Exception $e) {
            Log::error('Error deleting struktur:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()->withErrors([
                'error' => 'Gagal menghapus data struktur: ' . $e->getMessage()
            ]);
        }
    }
}
