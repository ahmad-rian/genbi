import AdminLayout from '@/Layouts/AdminLayout'
import { Head, router } from '@inertiajs/react'
import { UserForm } from '@/Components/Users/UserForm'

interface User {
  id: number;
  name: string;
  email: string;
  type: string;
  is_active: boolean;
}

interface Props {
  user: User;
  errors: Record<string, string>;
}

export default function Edit({ user, errors }: Props) {
  const handleSubmit = (formData: FormData) => {
    router.post(route('admin.users.update', user.id), {
      _method: 'PATCH',
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      type: formData.get('type'),
      is_active: formData.get('is_active') === 'true',
    }, {
      onSuccess: () => {
        // Optional: Add success toast or notification
        console.log('User updated successfully');
      },
      onError: (errors) => {
        console.error('Update failed:', errors);
      }
    });
  };

  return (
    <AdminLayout>
      <Head title="Edit User" />
      
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Edit User</h2>
        {errors && Object.keys(errors).length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="text-red-700">
              <ul>
                {Object.entries(errors).map(([key, value]) => (
                  <li key={key}>{value}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <UserForm 
          initialData={user}
          onSubmit={handleSubmit}
          isEdit
        />
      </div>
    </AdminLayout>
  );
}