import { useState, useEffect } from 'react'
import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select'
import { Switch } from '@/Components/ui/switch'

interface User {
  id?: number;
  name: string;
  email: string;
  type: string;
  is_active: boolean;
}

interface UserFormProps {
  initialData?: User;
  onSubmit: (formData: FormData) => void;
  isEdit?: boolean;
}

export function UserForm({ initialData, onSubmit, isEdit = false }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    password: '',
    type: initialData?.type || 'user',
    is_active: initialData?.is_active ?? true,
  });

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        name: initialData.name,
        email: initialData.email,
        type: initialData.type,
        is_active: initialData.is_active,
      }));
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      // Only include password if it's not empty in edit mode
      if (key === 'password' && isEdit && !value) return;
      // Convert boolean to string for FormData
      if (typeof value === 'boolean') {
        form.append(key, value.toString());
      } else {
        form.append(key, value);
      }
    });
    
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? 'Edit User' : 'Create New User'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              {isEdit ? 'New Password (leave blank to keep current)' : 'Password'}
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              required={!isEdit}
              placeholder={isEdit ? "Leave blank to keep current password" : ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">User Type</Label>
            <Select 
              name="type"
              value={formData.type} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="operator">Operator</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              name="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
            />
            <Label htmlFor="is_active">Active</Label>
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
            {isEdit ? 'Update' : 'Create'} User
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}