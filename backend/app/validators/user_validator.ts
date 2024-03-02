import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    id: vine.number().positive().withoutDecimals().optional(),
    username: vine.string().trim(),
    email: vine.string().email(),

    date: vine.date(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    id: vine.number().positive().withoutDecimals(),
    username: vine.string().trim(),
    email: vine.string().email(),

    date: vine.date(),
  })
)