import { Router } from 'express'
import { uploadMedia } from '../controllers/media.controller.js'
import { authenticate } from '../middleware/auth.js'
import { uploadGeneral } from '../middleware/upload.js'

const router = Router()

router.post('/upload', authenticate, uploadGeneral.single('file'), uploadMedia)

export default router
