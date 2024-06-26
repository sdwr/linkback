import vine from '@vinejs/vine'

export const createUserActionValidator = vine.compile(
  vine.object({
    id: vine.number().positive().withoutDecimals().optional(),
    userId: vine.number().positive().withoutDecimals(),
    itemId: vine.number().positive().withoutDecimals(),
    actionType: vine.string().trim(),

    date: vine.string().trim(),
  })
)

export const updateUserActionValidator = vine.compile(
  vine.object({
    date: vine.string().trim(),
  })
)