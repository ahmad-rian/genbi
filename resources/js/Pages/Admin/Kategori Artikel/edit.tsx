import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';

export default function Edit({ kategoriArtikel }) {
    const { data, setData } = useForm({
        nama: kategoriArtikel.nama || '',
        thumbnail: kategoriArtikel.thumbnail,
        deskripsi: kategoriArtikel.deskripsi || '',
    });


    const handleSubmit = (e) => {
        e.preventDefault();

        router.put(route('admin.kategori-artikel.update', kategoriArtikel.id), data, {
            onSuccess: () => alert('Kategori berhasil diperbarui!'),
        });
    };

    return (
        <AdminLayout>
            <Head title="Edit Kategori Artikel" />
            <div className="container py-6">
                <h2 className="text-2xl font-bold mb-6">Edit Kategori Artikel</h2>
                <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                    <div>
                        <label htmlFor="nama" className="block font-medium">Nama Kategori</label>
                        <Input
                            id="nama"
                            name="nama"
                            type="text"
                            value={data.nama}
                            onChange={(e) => setData('nama', e.target.value)}
                            required
                            className='mt-1 p-2 w-full border border-gray-300 rounded'
                        />
                    </div>
                    <div>
                        <label htmlFor="thumbnail" className="block font-medium">Thumbnail</label>
                        <Input
                            id="thumbnail"
                            name="thumbnail"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('thumbnail', e.target.value)}
                            className='mt-1 p-2 w-full border border-gray-300 rounded'
                        />
                        {kategoriArtikel.thumbnail && (
                            <img
                                src={`/storage/Thumbnail Kategori Artikel/${kategoriArtikel.thumbnail}`}
                                alt="Thumbnail Lama"
                                className="w-28 h-28 rounded-md mt-2 object-cover"
                            />
                        )}
                    </div>
                    <div>
                        <label htmlFor="deskripsi" className="block font-medium">Deskripsi</label>
                        <Textarea
                            required
                            id="deskripsi"
                            name="deskripsi"
                            value={data.deskripsi}
                            onChange={(e) => setData('deskripsi', e.target.value)}
                            className='mt-1 p-2 w-full border border-gray-300 rounded'
                        />
                    </div>
                    <Button type="submit" className="bg-blue-600 text-white">
                        Perbarui
                    </Button>
                </form>
            </div>
        </AdminLayout>
    );
}
