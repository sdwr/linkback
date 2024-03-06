import type { HttpContext } from '@adonisjs/core/http'

import Vote from '#models/vote';
import IVote from '#models/request_objects/iVote';

import { createVoteValidator, updateVoteValidator } from '#validators/vote_validator';

export default class VoteController {
  constructor() {}

  async index({ response }: HttpContext) {
    const votes = await Vote.all();

    return response.ok(votes);
  }

  async getOne({ request, response }: HttpContext) {
    const id = request.param('id');

    const vote = await Vote.findOrFail(id);

    return response.ok(vote);
  }

  async getVotesByLink({ request, response }: HttpContext) {
    const linkId = request.param('linkId');

    const votes = await Vote.query()
      .where('linkId', linkId)

    return response.ok(votes);
  }

  async getVotesByUser({ request, response }: HttpContext) {
    const userId = request.param('userId');

    const votes = await Vote.query()
      .where('userId', userId)

    return response.ok(votes);
  }

  async createOrUpdate({ request, response }: HttpContext) {
    const validatedData = await request.validateUsing(createVoteValidator);
    const iVote = validatedData as IVote;

    let vote = await Vote.query()
      .where('userId', iVote.userId)
      .andWhere('linkId', iVote.linkId)
      .first()

    if (vote) {
      vote.merge(iVote);
      await vote.save();
    } else {
      vote = await Vote.create(iVote);
    }

    return response.ok(vote);
  }

  async create({ request, response }: HttpContext) {
    const validatedData = await request.validateUsing(createVoteValidator);
    const iVote = validatedData as IVote;

    const vote = await Vote.create(iVote);

    return response.ok(vote);
  }

  async update({ request, response }: HttpContext) {
    const validatedData = await request.validateUsing(updateVoteValidator);
    const iVote = validatedData as IVote;

    const vote = await Vote.findOrFail(iVote.id);
    vote.merge(iVote);
    await vote.save();

    return response.ok(vote);
  }

  async delete({ request, response }: HttpContext) {
    const id = request.param('id');

    const vote = await Vote.findOrFail(id);
    await vote.delete();

    return response.ok(vote);
  }

}