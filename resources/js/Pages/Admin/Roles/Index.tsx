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

interface Role {
  id: number;
  name: string;
  permissions: string[];
  created_at: string;
}

interface Props {
  roles: Role[];
  flash?: { message?: string };
}

export default function Roles({ roles, flash }: Props) {
  const handleDelete = (roleId: number) => {
    router.delete(route('admin.roles.destroy', roleId));
  };

  return (
    <AdminLayout>
      <Head title="Roles Management" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Roles</h2>
          <Link href={route('admin.roles.create')}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Role
            </Button>
          </Link>
        </div>

        {flash?.message && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4">
            {flash.message}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Roles List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b">
                    <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Permissions</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Created At</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {roles.map((role) => (
                    <tr key={role.id} className="border-b">
                      <td className="p-4 align-middle capitalize">{role.name}</td>
                      <td className="p-4 align-middle">
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.map((permission) => (
                            <span key={permission} className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                              {permission}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        {new Date(role.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-2">
                          <Link href={route('admin.roles.edit', role.id)}>
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
                                  This action cannot be undone. This will permanently delete the role
                                  and remove its associations.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDelete(role.id)}
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