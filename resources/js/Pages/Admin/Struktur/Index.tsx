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
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/Components/ui/dropdown-menu';
import { MoreHorizontal, Plus, Pencil, Trash, User } from 'lucide-react';
import { toast } from 'sonner';

interface Struktur {
  id: number;
  nama_lengkap: string;
  foto: string | null;
  foto_url: string | null;
  jabatan: string;
  universitas: string;
  komisariat: string;
  quote: string | null;
  periode: string | null;
  is_active: boolean;
  urutan: number;
}

interface Props {
  struktur: Struktur[];
  filters?: {
    search?: string;
    status?: string;
  };
}

export default function Index({ struktur, filters }: Props) {
  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      router.delete(route('admin.struktur.destroy', id), {
        onSuccess: () => {
          toast.success('Data berhasil dihapus');
        },
        onError: (errors) => {
          toast.error('Gagal menghapus data', {
            description: Object.values(errors).join('\n')
          });
        },
      });
    }
  };

  const renderImage = (item: Struktur) => {
    if (!item.foto_url) {
      return (
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <User className="w-6 h-6 text-gray-400" />
        </div>
      );
    }

    return (
      <div className="w-12 h-12">
        <img 
          src={item.foto_url}
          alt={item.nama_lengkap}
          className="w-full h-full object-cover rounded-lg"
          onError={(e) => {
            console.log('Image load error:', item.foto_url);
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            if (target.parentElement) {
              target.parentElement.innerHTML = `
                <div class="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              `;
            }
          }}
        />
      </div>
    );
  };

  return (
    <AdminLayout>
      <Head title="Daftar Pengurus" />
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Daftar Pengurus</h2>
            <p className="text-muted-foreground">Kelola data pengurus organisasi</p>
          </div>
          <Button asChild>
            <Link href={route('admin.struktur.create')}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Pengurus
            </Link>
          </Button>
        </div>

        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">No</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead className="w-[100px]">Foto</TableHead>
                <TableHead>Jabatan</TableHead>
                <TableHead>Universitas</TableHead>
                <TableHead>Komisariat</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]">Urutan</TableHead>
                <TableHead className="w-[100px] text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {struktur.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{item.nama_lengkap}</TableCell>
                  <TableCell>{renderImage(item)}</TableCell>
                  <TableCell>{item.jabatan}</TableCell>
                  <TableCell>{item.universitas}</TableCell>
                  <TableCell>{item.komisariat}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell>{item.urutan}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link 
                            href={route('admin.struktur.edit', item.id)}
                            className="flex items-center"
                          >
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 cursor-pointer"
                        >
                          <Trash className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {struktur.length === 0 && (
                <TableRow>
                  <TableCell 
                    colSpan={9} 
                    className="h-24 text-center text-muted-foreground"
                  >
                    Tidak ada data pengurus
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}