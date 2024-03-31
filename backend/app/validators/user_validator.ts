import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    username: vine.string().trim(),
    email: vine.string().email(),

    date: vine.string().trim(),
  })
)

export const createGuestUserValidator = vine.compile(
  vine.object({
    isGuest: vine.boolean().parse(v => v === 'true' || v === true),
    date: vine.string().trim(),
  })
)

export const upgradeGuestUserValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().trim(),


    date: vine.string().trim(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    username: vine.string().trim(),

    date: vine.string().trim(),
  })
)