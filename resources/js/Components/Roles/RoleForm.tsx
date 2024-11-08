import { useState, useEffect } from 'react'
import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Checkbox } from '@/Components/ui/checkbox'

interface RoleFormProps {
  initialData?: {
    id?: number;
    name: string;
    permissions: string[];
  };
  permissions: string[];
  onSubmit: (data: { name: string; permissions: string[] }) => void;
  isEdit?: boolean;
}

export function RoleForm({ initialData, permissions, onSubmit, isEdit = false }: RoleFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    permissions: initialData?.permissions || [],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        permissions: initialData.permissions,
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const togglePermission = (permission: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? 'Edit Role' : 'Create New Role'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Role Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Permissions</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {permissions.map((permission) => (
                <div key={permission} className="flex items-center space-x-2">
                  <Checkbox
                    id={permission}
                    checked={formData.permissions.includes(permission)}
                    onCheckedChange={() => togglePermission(permission)}
                  />
                  <Label htmlFor={permission} className="text-sm">
                    {permission}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button type="submit">
            {isEdit ? 'Update' : 'Create'} Role
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}