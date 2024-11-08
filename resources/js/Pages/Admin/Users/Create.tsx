import AdminLayout from '@/Layouts/AdminLayout'
import { Head, router } from '@inertiajs/react'
import { UserForm } from '@/Components/Users/UserForm'

export default function Create() {
  const handleSubmit = (formData: FormData) => {
    router.post(route('admin.users.store'), Object.fromEntries(formData));
  };

  return (
    <AdminLayout>
      <Head title="Create User" />
      
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Create User</h2>
        <UserForm onSubmit={handleSubmit} />
      </div>
    </AdminLayout>
  );
}