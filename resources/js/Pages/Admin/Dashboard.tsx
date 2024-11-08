import AdminLayout from '@/Layouts/AdminLayout'
import { Head } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import { Users, Shield, Settings } from 'lucide-react'

interface Props {
  totalUsers: number;
  totalRoles: number;
  totalPermissions: number;
}

export default function Dashboard({ totalUsers, totalRoles, totalPermissions }: Props) {
  const stats = [
    {
      name: "Total Users",
      value: totalUsers,
      icon: Users,
    },
    {
      name: "Roles",
      value: totalRoles,
      icon: Shield,
    },
    {
      name: "Permissions",
      value: totalPermissions,
      icon: Settings,
    }
  ]

  return (
    <AdminLayout>
      <Head title="Admin Dashboard" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.name}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </AdminLayout>
  )
}