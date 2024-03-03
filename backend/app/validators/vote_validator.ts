import vine from '@vinejs/vine'

/**
 * Validates the vote's creation action
 */
export const createVoteValidator = vine.compile(
  vine.object({
    id: vine.number().positive().withoutDecimals().optional(),
    linkId: vine.number().positive().withoutDecimals(),
    userId: vine.number().positive().withoutDecimals(),
    voteValue: vine.number().withoutDecimals(),

    date: vine.string().trim(),
  })
)

/**
 * Validates the vote's update action
 */
export const updateVoteValidator = vine.compile(
  vine.object({
    id: vine.number().positive().withoutDecimals(),
    linkId: vine.number().positive().withoutDecimals(),
    userId: vine.number().positive().withoutDecimals(),
    voteValue: vine.number().withoutDecimals(),
    
    date: vine.string().trim(),
  })
)