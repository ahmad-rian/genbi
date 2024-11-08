import AdminLayout from '@/Layouts/AdminLayout'
import { Head, router } from '@inertiajs/react'
import { RoleForm } from '@/Components/Roles/RoleForm'

interface Role {
  id: number;
  name: string;
  permissions: string[];
}

interface Props {
  role: Role;
  permissions: string[];
}

export default function Edit({ role, permissions }: Props) {
  const handleSubmit = (data: { name: string; permissions: string[] }) => {
    router.post(route('admin.roles.update', role.id), {
      _method: 'PATCH',
      ...data,
    });
  };

  return (
    <AdminLayout>
      <Head title="Edit Role" />
      
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Edit Role</h2>
        <RoleForm 
          initialData={role}
          permissions={permissions}
          onSubmit={handleSubmit}
          isEdit
        />
      </div>
    </AdminLayout>
  );
}