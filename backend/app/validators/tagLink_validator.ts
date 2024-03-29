import vine from '@vinejs/vine'

/**
 * Validates the tagLink's creation action
 */
export const createTagLinkValidator = vine.compile(
  vine.object({
    id: vine.number().positive().withoutDecimals().optional(),
    tagId: vine.number().positive().withoutDecimals(),
    linkId: vine.number().positive().withoutDecimals(),
    userId: vine.number().positive().withoutDecimals().optional(),
    date: vine.string().trim(),
  })
)

/**
 * Validates the tagLink's update action
 */
export const updateTagLinkValidator = vine.compile(
  vine.object({
    date: vine.string().trim(),
  })
)