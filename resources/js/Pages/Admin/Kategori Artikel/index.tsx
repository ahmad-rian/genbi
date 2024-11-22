import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Components/ui/table';
import { Pencil, Plus, Trash, } from 'lucide-react';

export default function Index({kategoriArtikel}) {

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
        router.delete(route('admin.artikel.destroy', id), {
            onSuccess: () => {
            // Optionally, show a success message or refresh the page
            },
        });
        }
    };

    return(
       <AdminLayout>
            <Head title="Daftar Kategori Artikel" />
            <div className="container py-6">
                <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Daftar Kategori Artikel</h2>
                    <p className="text-muted-foreground">Kelola data kategori artikel</p>
                </div>
                <Button asChild>
                    <Link href={route('admin.kategori-artikel.create')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Kategori Artikel
                    </Link>
                </Button>
                </div>

                <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Thumbnail</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Deskripsi</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {kategoriArtikel.length > 0 ? (
                        kategoriArtikel.map((kt, index) => (
                            <TableRow key={kt.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                <img src={`/storage/Thumbnail Kategori Artikel/${kt.thumbnail}`} alt="Thumbnail" className="w-28 h-28 rounded-md object-cover" />
                            </TableCell>
                            <TableCell>{kt.nama}</TableCell>
                            <TableCell>{kt.deskripsi}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex space-x-2">
                                <Link
                                href={`/admin/kategori-artikel/${kt.id}/edit`}
                                className="px-3 py-1 bg-yellow-500 text-slate-900 rounded hover:bg-yellow-600 flex items-center justify-center"
                                >
                                <Pencil className="w-4 h-4" />
                                </Link>

                                <Button
                                variant="destructive"
                                onClick={() => handleDelete(kt.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                <Trash className="w-4 h-4" />
                                </Button>
                                </div>
                            </TableCell>
                            </TableRow>
                        ))
                        ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="px-4 py-2 text-center text-sm text-gray-500">
                            Tidak ada artikel tersedia.
                            </TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>


                </div>
            </div>
      </AdminLayout>
    )
}
