import { Router } from 'express'
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/users.controller.js'
import { authenticate, requireRole } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { createUserSchema, updateUserSchema } from '../validation/user.schema.js'

const router = Router()

// Super admins and admins can manage users. Admins are further restricted
// in the controller — they cannot view, create, modify, or delete Super Admin accounts.
router.use(authenticate, requireRole('SUPER_ADMIN', 'ADMIN'))

router.get('/', getAllUsers)
router.post('/', validate(createUserSchema), createUser)
router.patch('/:id', validate(updateUserSchema), updateUser)
router.delete('/:id', deleteUser)

export default router
