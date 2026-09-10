import { Router } from 'express'
import { uploadMedia } from '../controllers/media.controller.js'
import { authenticate, requireRole } from '../middleware/auth.js'
import { uploadGeneral } from '../middleware/upload.js'

const router = Router()

router.post('/upload', authenticate, requireRole('SUPER_ADMIN'), uploadGeneral.single('file'), uploadMedia)

export default router
