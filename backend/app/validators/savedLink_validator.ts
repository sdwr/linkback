import vine from '@vinejs/vine'

/**
 * Validates the savedLink's creation action
 */
export const createSavedLinkValidator = vine.compile(
  vine.object({
    id: vine.number().positive().withoutDecimals().optional(),
    linkId: vine.number().positive().withoutDecimals(),
    userId: vine.number().positive().withoutDecimals(),
    date: vine.string().trim(),
  })
)

/**
 * Validates the savedLink's update action
 */
export const updateSavedLinkValidator = vine.compile(
  vine.object({
    date: vine.string().trim(),
  })
)