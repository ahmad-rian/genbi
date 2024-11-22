import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { useState } from 'react';

export default function Create() {
    const [formData, setFormData] = useState({
        nama: '',
        thumbnail: null,
        deskripsi: '',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('nama', formData.nama);
        data.append('thumbnail', formData.thumbnail);
        data.append('deskripsi', formData.deskripsi);

        router.post(route('admin.kategori-artikel.store'), data, {
            onSuccess: () => alert('Kategori berhasil dibuat!'),
        });
    };

    return (
        <AdminLayout>
            <Head title="Tambah Kategori Artikel" />
            <div className="container py-6">
                <h2 className="text-2xl font-bold mb-6">Tambah Kategori Artikel</h2>
                <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                    <div>
                        <label htmlFor="nama" className="block font-medium">Nama Kategori</label>
                        <Input
                            id="nama"
                            name="nama"
                            type="text"
                            value={formData.nama}
                            onChange={handleChange}
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
                            onChange={handleChange}
                            className='mt-1 p-2 w-full border border-gray-300 rounded'
                        />
                    </div>
                    <div>
                        <label htmlFor="deskripsi" className="block font-medium">Deskripsi</label>
                        <Textarea
                            id="deskripsi"
                            name="deskripsi"
                            value={formData.deskripsi}
                            onChange={handleChange}
                            required
                            className='mt-1 p-2 w-full border border-gray-300 rounded'
                        />
                    </div>
                    <Button type="submit" className="bg-blue-600 text-white">
                        Simpan
                    </Button>
                </form>
            </div>
        </AdminLayout>
    );
}
