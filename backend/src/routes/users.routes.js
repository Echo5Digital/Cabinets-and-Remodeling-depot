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

// All routes restricted to super admins only.
router.use(authenticate, requireRole('SUPER_ADMIN'))

router.get('/', getAllUsers)
router.post('/', validate(createUserSchema), createUser)
router.patch('/:id', validate(updateUserSchema), updateUser)
router.delete('/:id', deleteUser)

export default router
