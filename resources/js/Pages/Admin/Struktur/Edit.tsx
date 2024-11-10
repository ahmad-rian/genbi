import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StrukturForm from '@/Components/Struktur/StrukturForm';
import type { Struktur } from '@/types/struktur';

interface EditProps {
  struktur: Struktur;
}

export default function Edit({ struktur }: EditProps) {
  return (
    <AdminLayout>
      <Head title="Edit Pengurus" />
      <div className="container py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Edit Pengurus</h2>
          <p className="text-muted-foreground">Edit data pengurus {struktur.nama_lengkap}</p>
        </div>
        <StrukturForm 
          initialData={struktur}
          isEdit={true}
        />
      </div>
    </AdminLayout>
  );
}