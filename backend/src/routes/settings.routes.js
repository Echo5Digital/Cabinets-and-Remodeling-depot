import { Router } from 'express'
import {
  getAllSettings,
  getSettingsByGroup,
  updateSettings,
  uploadSettingImage,
} from '../controllers/settings.controller.js'
import { authenticate, requireRole } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { updateSettingsSchema } from '../validation/settings.schema.js'
import { uploadGeneral } from '../middleware/upload.js'

const router = Router()

const requireSuperAdmin = requireRole('SUPER_ADMIN')

// Public (for site-wide settings like company name, phone, etc.)
router.get('/', getAllSettings)
router.get('/group/:group', getSettingsByGroup)

// Admin
router.put('/', authenticate, requireSuperAdmin, validate(updateSettingsSchema), updateSettings)
router.post('/upload-image', authenticate, requireSuperAdmin, uploadGeneral.single('image'), uploadSettingImage)

export default router
