import Setting from '../models/Setting.js'
import { deleteImage } from '../services/cloudinary.service.js'

/**
 * GET /api/settings
 * Returns all settings as a key-value map.
 */
export async function getAllSettings(req, res, next) {
  try {
    const settings = await Setting.find().sort({ key: 1 })

    // Return as flat key-value map for easy consumption
    const settingsMap = Object.fromEntries(settings.map((s) => [s.key, s.value]))

    res.json({ success: true, data: settingsMap, raw: settings })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/settings/group/:group
 */
export async function getSettingsByGroup(req, res, next) {
  try {
    const settings = await Setting.find({ group: req.params.group })
    const settingsMap = Object.fromEntries(settings.map((s) => [s.key, s.value]))
    res.json({ success: true, data: settingsMap })
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/settings/upload-image (admin)
 * Upload an image file to Cloudinary and store the URL in a setting key.
 * Body fields: key (required), label (optional), group (optional)
 */
export async function uploadSettingImage(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No image file provided.' })
    }
    const { key, label, group } = req.body
    if (!key) {
      return res.status(400).json({ success: false, error: 'Setting key is required.' })
    }

    // Delete old Cloudinary image if a publicId companion key exists
    const publicIdKey = `${key}PublicId`
    const existing = await Setting.findOne({ key: publicIdKey })
    if (existing?.value) {
      await deleteImage(existing.value)
    }

    // Upsert image URL
    await Setting.findOneAndUpdate(
      { key },
      { $set: { value: req.file.path, ...(label && { label }), ...(group && { group }) } },
      { upsert: true, new: true }
    )
    // Upsert publicId companion for future cleanup
    await Setting.findOneAndUpdate(
      { key: publicIdKey },
      { $set: { value: req.file.filename, group: group || null } },
      { upsert: true, new: true }
    )

    res.json({ success: true, data: { key, value: req.file.path } })
  } catch (err) {
    next(err)
  }
}

/**
 * PUT /api/settings (admin)
 * Upsert multiple settings at once using findOneAndUpdate with upsert:true.
 */
export async function updateSettings(req, res, next) {
  try {
    const { settings } = req.body

    await Promise.all(
      settings.map(({ key, value, label, group }) =>
        Setting.findOneAndUpdate(
          { key },
          { $set: { value, ...(label && { label }), ...(group && { group }) } },
          { upsert: true, new: true }
        )
      )
    )

    res.json({ success: true, message: 'Settings updated successfully.' })
  } catch (err) {
    next(err)
  }
}
