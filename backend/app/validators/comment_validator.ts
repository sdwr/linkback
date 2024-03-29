import vine from '@vinejs/vine'



export const createCommentValidator = vine.compile(
  vine.object({
    id: vine.number().positive().withoutDecimals().optional(),
    content: vine.string().trim(),

    linkId: vine.number().positive().withoutDecimals(),
    userId: vine.number().positive().withoutDecimals(),

    date: vine.string().trim(),
  })
)

export const updateCommentValidator = vine.compile(
  vine.object({
    content: vine.string().trim(),

    linkId: vine.number().positive().withoutDecimals(),
    userId: vine.number().positive().withoutDecimals(),

    date: vine.string().trim(),
  })
)
