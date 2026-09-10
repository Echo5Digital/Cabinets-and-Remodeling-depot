'use client'

import { useState } from 'react'
import { useUsers, useUpdateUser, useDeleteUser } from '@/hooks/useUsers'
import { useAuth } from '@/hooks/useAuth'
import { CreateUserDialog } from '@/components/admin/CreateUserDialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth()
  const { data, isLoading } = useUsers()
  const updateUser = useUpdateUser()
  const deleteUser = useDeleteUser()
  const [createOpen, setCreateOpen] = useState(false)

  const users = data?.data || []

  const handleRoleChange = async (targetUser, role) => {
    try {
      await updateUser.mutateAsync({ id: targetUser.id, role })
      toast.success('Role updated')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update role')
    }
  }

  const handleToggleActive = async (targetUser) => {
    try {
      await updateUser.mutateAsync({ id: targetUser.id, isActive: !targetUser.isActive })
      toast.success(targetUser.isActive ? 'User deactivated' : 'User activated')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update user')
    }
  }

  const handleDelete = async (targetUser) => {
    if (!window.confirm(`Delete user "${targetUser.name}"? This cannot be undone.`)) return
    try {
      await deleteUser.mutateAsync(targetUser.id)
      toast.success('User deleted')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to delete user')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground mt-1">
            Manage admin logins and their access level.
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => {
                const isSelf = u.id === currentUser?.id
                return (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">
                      {u.name}
                      {isSelf && (
                        <Badge variant="secondary" className="ml-2">
                          You
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>
                      <Select
                        value={u.role}
                        disabled={isSelf}
                        onValueChange={(role) => handleRoleChange(u, role)}
                      >
                        <SelectTrigger className="w-44">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ADMIN">Admin (limited)</SelectItem>
                          <SelectItem value="SUPER_ADMIN">Super Admin (full)</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={u.isActive ? 'default' : 'outline'}
                        className={isSelf ? '' : 'cursor-pointer'}
                        onClick={() => !isSelf && handleToggleActive(u)}
                      >
                        {u.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={isSelf}
                        onClick={() => handleDelete(u)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </div>

      <CreateUserDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  )
}
