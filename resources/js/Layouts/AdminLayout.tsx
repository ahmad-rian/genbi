import { useAuth } from '@/Hooks/useAuth'
import Sidebar from '@/Components/ui/sidebar'
import { Button } from '@/Components/ui/button'
import { 
  LayoutDashboard, 
  Users, 
  Shield, 
  LogOut
} from 'lucide-react'
import { Link, useForm } from '@inertiajs/react'
import { cn } from '@/lib/utils'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()
  const { post } = useForm()

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault()
    post(route('logout'))
  }

  const navigation = [
    {
      name: 'Dashboard',
      href: route('admin.dashboard'),
      icon: LayoutDashboard
    },
    {
      name: 'Users',
      href: route('admin.users.index'),
      icon: Users
    },
    {
      name: 'Roles',
      href: route('admin.roles.index'),
      icon: Shield
    },
  ]

  const footer = (
    <div className="space-y-4">
      <div className="flex items-center gap-x-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">{user?.name}</p>
          <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
        </div>
      </div>
      <form onSubmit={handleLogout}>
        <Button type="submit" variant="outline" className="w-full justify-start">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </form>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Sidebar title="GenBI Panel" footer={footer}>
        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  route().current(item.href) && "bg-accent text-accent-foreground"
                )}
                onClick={(e) => {
                  if (window.innerWidth < 1024) {
                    const closeButton = document.querySelector('[aria-label="Close"]')
                    if (closeButton instanceof HTMLElement) {
                      closeButton.click()
                    }
                  }
                }}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </Sidebar>

      {/* Main Content */}
      <div className="lg:pl-72">
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
