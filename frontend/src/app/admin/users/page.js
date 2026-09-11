'use client'

import { useState } from 'react'
import { useUsers, useUpdateUser, useDeleteUser, useRetrySyncUser } from '@/hooks/useUsers'
import { useAuth } from '@/hooks/useAuth'
import { CreateUserDialog } from '@/components/admin/CreateUserDialog'
import { EditUserDialog } from '@/components/admin/EditUserDialog'
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
import { Plus, Trash2, Pencil, RefreshCw, CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { ROLE_OPTIONS } from '@/lib/constants'
import { toast } from 'sonner'

function SyncStatusBadge({ user, onRetry, retrying }) {
  if (user.catalogSyncStatus === 'SYNCED') {
    return (
      <CheckCircle2
        className="w-4 h-4 text-green-600"
        title="Synced with Catalog Platform"
      />
    )
  }

  if (user.catalogSyncStatus === 'FAILED') {
    return (
      <div className="flex items-center gap-1">
        <XCircle
          className="w-4 h-4 text-destructive"
          title={user.catalogSyncError || 'Catalog Platform sync failed'}
        />
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          disabled={retrying}
          onClick={onRetry}
          title="Retry sync"
        >
          {retrying ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
        </Button>
      </div>
    )
  }

  return <span className="text-xs text-muted-foreground">—</span>
}

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth()
  const { data, isLoading } = useUsers()
  const updateUser = useUpdateUser()
  const deleteUser = useDeleteUser()
  const retrySyncUser = useRetrySyncUser()
  const [createOpen, setCreateOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [retryingId, setRetryingId] = useState(null)

  const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN'
  // Defense in depth — the backend already omits Super Admin rows for
  // restricted Admin callers; this just guards against a stale cache.
  const users = (data?.data || []).filter((u) => isSuperAdmin || u.role !== 'SUPER_ADMIN')
  const assignableRoles = isSuperAdmin ? ROLE_OPTIONS : ROLE_OPTIONS.filter((r) => r.value !== 'SUPER_ADMIN')

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
      const result = await deleteUser.mutateAsync(targetUser.id)
      if (result?.catalogSyncFailed) {
        toast.warning(result.message)
      } else {
        toast.success('User deleted')
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to delete user')
    }
  }

  const handleRetrySync = async (targetUser) => {
    let password
    if (!targetUser.catalogPlatformUserId) {
      password = window.prompt(
        `"${targetUser.name}" was never created on the Catalog Platform. Enter a password to create it there now:`
      )
      if (!password) return
    }

    setRetryingId(targetUser.id)
    try {
      await retrySyncUser.mutateAsync({ id: targetUser.id, password })
      toast.success('Catalog Platform sync succeeded')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Sync retry failed')
    } finally {
      setRetryingId(null)
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
                <TableHead>Catalog Platform</TableHead>
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
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {assignableRoles.map((r) => (
                            <SelectItem key={r.value} value={r.value}>
                              {r.label}
                            </SelectItem>
                          ))}
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
                    <TableCell>
                      <SyncStatusBadge user={u} onRetry={() => handleRetrySync(u)} retrying={retryingId === u.id} />
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingUser(u)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
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
      <EditUserDialog
        open={!!editingUser}
        onOpenChange={(next) => !next && setEditingUser(null)}
        user={editingUser}
        canAssignSuperAdmin={isSuperAdmin}
        isSelf={editingUser?.id === currentUser?.id}
      />
    </div>
  )
}
