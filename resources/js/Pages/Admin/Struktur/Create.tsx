import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StrukturForm from '@/Components/Struktur/StrukturForm';

export default function Create() {
  return (
    <AdminLayout>
      <Head title="Tambah Pengurus" />
      <div className="container py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Tambah Pengurus</h2>
          <p className="text-muted-foreground">Tambah data pengurus baru</p>
        </div>
        <StrukturForm />
      </div>
    </AdminLayout>
  );
}