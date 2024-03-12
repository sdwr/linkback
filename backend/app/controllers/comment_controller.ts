
import type { HttpContext } from '@adonisjs/core/http'

import Comment from '#models/comment';
import IComment from '#models/request_objects/iComment';
import { createCommentValidator, updateCommentValidator } from '#validators/comment_validator';

export default class LinkController {
  constructor() {}

  async index({ response }: HttpContext) {
    const comments = await Comment.all();

    return response.ok(comments);
  }

  async getOne({ request, response }: HttpContext) {
    const id = request.param('id');

    const comment = await Comment.findOrFail(id);

    return response.ok(comment);
  }

  async getCommentsByUser({ request, response }: HttpContext) {
    const userId = request.param('userId');

    const comments = await Comment.query()
      .where('userId', userId)

    return response.ok(comments);
  }

  async getCommentsByLink({ request, response }: HttpContext) {
    const linkId = request.param('linkId');

    const comments = await Comment.findBy('linkId', linkId)

    return response.ok(comments);
  }

  async create({ request, response }: HttpContext) {
    const validatedData = await request.validateUsing(createCommentValidator);
    const iComment = validatedData as IComment;

    const comment = await Comment.create(iComment);

    return response.ok(comment);
  }

  async update({ request, response }: HttpContext) {
    const validatedData = await request.validateUsing(updateCommentValidator);
    const iComment = validatedData as IComment;

    const comment = await Comment.findOrFail(iComment.id);
    comment.merge(iComment);
    await comment.save();

    return response.ok(comment);
  }

  async delete({ request, response }: HttpContext) {
    const id = request.param('id');

    const comment = await Comment.findOrFail(id);
    await comment.delete();

    return response.ok(comment);
  }

  async deleteAll({ response }: HttpContext) {
    await Comment.truncate(true);

    return response.ok('All comments deleted');
  }

}