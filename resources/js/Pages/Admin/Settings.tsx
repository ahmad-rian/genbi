import AdminLayout from '@/Layouts/AdminLayout'
import { Head } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import { Button } from '@/Components/ui/button'

export default function Settings() {
  return (
    <AdminLayout>
      <Head title="Settings" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Site Name</label>
                <input type="text" className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="text-sm font-medium">Site Description</label>
                <textarea className="w-full px-3 py-2 border rounded-md" rows={3} />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">SMTP Host</label>
                <input type="text" className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="text-sm font-medium">SMTP Port</label>
                <input type="text" className="w-full px-3 py-2 border rounded-md" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}