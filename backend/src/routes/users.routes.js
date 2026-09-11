import { Router } from 'express'
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  retrySyncUser,
  handleCatalogUserWebhook,
} from '../controllers/users.controller.js'
import { authenticate, requireRole, verifyServiceKey } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import {
  createUserSchema,
  updateUserSchema,
  retrySyncUserSchema,
  catalogUserWebhookSchema,
} from '../validation/user.schema.js'

const router = Router()

// Inbound from the Cabinet Catalog Platform — service-key auth, not an admin JWT.
// Must be registered before the blanket authenticate/requireRole below.
router.post('/catalog-webhook', verifyServiceKey, validate(catalogUserWebhookSchema), handleCatalogUserWebhook)

// Super admins and admins can manage users. Admins are further restricted
// in the controller — they cannot view, create, modify, or delete Super Admin accounts.
router.use(authenticate, requireRole('SUPER_ADMIN', 'ADMIN'))

router.get('/', getAllUsers)
router.post('/', validate(createUserSchema), createUser)
router.patch('/:id', validate(updateUserSchema), updateUser)
router.delete('/:id', deleteUser)
router.post('/:id/retry-sync', validate(retrySyncUserSchema), retrySyncUser)

export default router
