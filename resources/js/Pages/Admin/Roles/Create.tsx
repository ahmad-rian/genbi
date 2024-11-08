import AdminLayout from '@/Layouts/AdminLayout'
import { Head, router } from '@inertiajs/react'
import { RoleForm } from '@/Components/Roles/RoleForm'

interface Props {
  permissions: string[];
}

export default function Create({ permissions }: Props) {
  const handleSubmit = (data: { name: string; permissions: string[] }) => {
    router.post(route('admin.roles.store'), data);
  };

  return (
    <AdminLayout>
      <Head title="Create Role" />
      
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Create Role</h2>
        <RoleForm 
          permissions={permissions}
          onSubmit={handleSubmit}
        />
      </div>
    </AdminLayout>
  );
}