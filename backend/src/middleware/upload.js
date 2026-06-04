import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from '../config/cloudinary.js'

function createStorage(folder) {
  return new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `cabinets-depot/${folder}`,
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      transformation: [{ width: 1920, crop: 'limit', quality: 'auto:good', fetch_format: 'auto' }],
    },
  })
}

function createUpload(folder) {
  return multer({
    storage: createStorage(folder),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
      const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
      if (allowed.includes(file.mimetype)) {
        cb(null, true)
      } else {
        cb(new Error('Only image files are allowed (jpg, png, webp, gif)'), false)
      }
    },
  })
}

export const uploadGallery = createUpload('gallery')
export const uploadProject = createUpload('projects')
export const uploadBlog = createUpload('blogs')
export const uploadGeneral = createUpload('general')
