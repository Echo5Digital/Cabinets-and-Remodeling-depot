import { Router } from 'express'
import {
  getAllSettings,
  getSettingsByGroup,
  updateSettings,
  uploadSettingImage,
} from '../controllers/settings.controller.js'
import { authenticate } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { updateSettingsSchema } from '../validation/settings.schema.js'
import { uploadGeneral } from '../middleware/upload.js'

const router = Router()

// Public (for site-wide settings like company name, phone, etc.)
router.get('/', getAllSettings)
router.get('/group/:group', getSettingsByGroup)

// Admin
router.put('/', authenticate, validate(updateSettingsSchema), updateSettings)
router.post('/upload-image', authenticate, uploadGeneral.single('image'), uploadSettingImage)

export default router
