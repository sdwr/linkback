import vine from '@vinejs/vine'

/**
 * Validates the tag's creation action
 */
export const createTagValidator = vine.compile(
  vine.object({
    id: vine.number().positive().withoutDecimals().optional(),
    name: vine.string().trim(),
    userId: vine.number().positive().withoutDecimals(),
    date: vine.date(),
  })
)

/**
 * Validates the tag's update action
 */
export const updateTagValidator = vine.compile(
  vine.object({
    id: vine.number().positive().withoutDecimals(),
    name: vine.string().trim(),
    userId: vine.number().positive().withoutDecimals(),
    date: vine.date(),
  })
)