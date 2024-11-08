import AdminLayout from '@/Layouts/AdminLayout'
import { Head, Link, router } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import { Button } from '@/Components/ui/button'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog"

interface User {
  id: number;
  name: string;
  email: string;
  type: string;
  is_active: boolean;
  created_at: string;
}

interface Props {
  users: User[];
  flash?: { message?: string };
}

export default function Users({ users, flash }: Props) {
  const handleDelete = (userId: number) => {
    router.delete(route('admin.users.destroy', userId));
  };

  return (
    <AdminLayout>
      <Head title="Users Management" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <Link href={route('admin.users.create')}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </Link>
        </div>

        {flash?.message && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
            {flash.message}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Users List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b">
                    <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Created At</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {users.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="p-4 align-middle">{user.name}</td>
                      <td className="p-4 align-middle">{user.email}</td>
                      <td className="p-4 align-middle capitalize">{user.type}</td>
                      <td className="p-4 align-middle">
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          user.is_active 
                            ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20' 
                            : 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20'
                        }`}>
                          {user.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="p-4 align-middle">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-2">
                          <Link href={route('admin.users.edit', user.id)}>
                            <Button variant="outline" size="sm">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the user
                                  and remove their data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDelete(user.id)}
                                  className="bg-red-500 hover:bg-red-600"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}