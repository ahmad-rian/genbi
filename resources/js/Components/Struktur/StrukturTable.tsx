import { Button } from '@/Components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table'
import { Pencil, Trash2 } from 'lucide-react'
import { router } from '@inertiajs/react'

interface StrukturData {
  id: number
  nama_lengkap: string
  foto: string | null
  jabatan: string
  universitas: string
  komisariat: string
  is_active: boolean
  urutan: number
}

interface StrukturTableProps {
  data: StrukturData[]
}

export default function StrukturTable({ data }: StrukturTableProps) {
  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      router.delete(route('admin.struktur.destroy', id))
    }
  }

  const getImageUrl = (foto: string | null) => {
    if (!foto) return '/placeholder-person.png' // Pastikan ada gambar placeholder
    
    // Jika foto adalah URL lengkap
    if (foto.startsWith('http')) return foto
    
    // Jika foto adalah path relatif
    if (foto.startsWith('/storage')) return foto
    
    // Jika foto hanya nama file
    return `/storage/${foto}`
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Foto</TableHead>
            <TableHead>Jabatan</TableHead>
            <TableHead>Universitas</TableHead>
            <TableHead>Komisariat</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Urutan</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.nama_lengkap}</TableCell>
              <TableCell>
                <div className="h-12 w-12 overflow-hidden rounded-full">
                  <img
                    src={getImageUrl(item.foto)}
                    alt={item.nama_lengkap}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-person.png';
                    }}
                  />
                </div>
              </TableCell>
              <TableCell>{item.jabatan}</TableCell>
              <TableCell>{item.universitas}</TableCell>
              <TableCell>{item.komisariat}</TableCell>
              <TableCell>
                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                  item.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {item.is_active ? 'Active' : 'Inactive'}
                </span>
              </TableCell>
              <TableCell>{item.urutan}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => router.get(route('admin.struktur.edit', item.id))}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}