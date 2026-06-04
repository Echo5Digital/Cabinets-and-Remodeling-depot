import Setting from '../models/Setting.js'

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
