import vine from '@vinejs/vine'


export const linkIdValidator = vine.compile(
  vine.object({
    id: vine.number().positive().withoutDecimals()
  })
)

/**
 * Validates the post's creation action
 */
export const createLinkValidator = vine.compile(
  vine.object({
    id: vine.number().positive().withoutDecimals().optional(),
    url: vine.string().trim().url(),

    domain: vine.string().trim().optional(),
    contentId: vine.string().trim().optional(),
    startTime: vine.number().optional(),
    endTime: vine.number().optional(),
    duration: vine.number().optional(),
    
    isClip: vine.boolean(),
    loopClip: vine.boolean(),
    embeddable: vine.boolean(),
    title: vine.string().trim(),
    description: vine.string().trim(),
    date: vine.string().trim(),
    userId: vine.number().positive().withoutDecimals(),
    originalLinkId: vine.number().positive().withoutDecimals().optional(),
    createdAt: vine.date().optional(),
    updatedAt: vine.date().optional(),
  })
)

/**
 * Validates the post's update action
 */
export const updateLinkValidator = vine.compile(
  vine.object({
    id: vine.number().positive().withoutDecimals(),
    
    loopClip: vine.boolean().optional(),
    title: vine.string().trim().optional(),
    description: vine.string().trim().optional(),
    date: vine.string().trim(),
  })
)
