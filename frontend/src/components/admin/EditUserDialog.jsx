'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useUpdateUser } from '@/hooks/useUsers'
import { ROLE_OPTIONS } from '@/lib/constants'
import { toast } from 'sonner'

export function EditUserDialog({ open, onOpenChange, user, canAssignSuperAdmin, isSelf }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {user && (
        <EditUserForm
          key={user.id}
          user={user}
          onOpenChange={onOpenChange}
          canAssignSuperAdmin={canAssignSuperAdmin}
          isSelf={isSelf}
        />
      )}
    </Dialog>
  )
}

function EditUserForm({ user, onOpenChange, canAssignSuperAdmin, isSelf }) {
  const [form, setForm] = useState({ name: user.name, password: '', role: user.role })
  const updateUser = useUpdateUser()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = { id: user.id, name: form.name }
      if (!isSelf) payload.role = form.role
      if (form.password) payload.password = form.password
      await updateUser.mutateAsync(payload)
      toast.success('User updated successfully')
      onOpenChange(false)
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update user')
    }
  }

  const assignableRoles = canAssignSuperAdmin
    ? ROLE_OPTIONS
    : ROLE_OPTIONS.filter((r) => r.value !== 'SUPER_ADMIN')

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit User</DialogTitle>
        <DialogDescription>
          Update this admin login&apos;s name, password, or role. Leave password blank to keep it unchanged.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="edit-name">Name</Label>
          <Input
            id="edit-name"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-password">New Password</Label>
          <Input
            id="edit-password"
            type="password"
            minLength={6}
            autoComplete="new-password"
            placeholder="Leave blank to keep current password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-role">Role</Label>
          <Select
            value={form.role}
            disabled={isSelf}
            onValueChange={(role) => setForm((f) => ({ ...f, role }))}
          >
            <SelectTrigger id="edit-role">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {assignableRoles.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label} — {r.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {isSelf && (
            <p className="text-xs text-muted-foreground">You cannot change your own role.</p>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={updateUser.isPending}>
            {updateUser.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
