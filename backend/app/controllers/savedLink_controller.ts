import type { HttpContext } from '@adonisjs/core/http'

import SavedLink from "#models/savedLink";
import ISavedLink from "#models/request_objects/iSavedLink";

import { createSavedLinkValidator, updateSavedLinkValidator } from "#validators/savedLink_validator";

export default class SavedLinkController {
  constructor() {}

  async index({ response }: HttpContext) {
    const savedLinks = await SavedLink.all();

    return response.ok(savedLinks);
  }

  async getOne({ request, response }: HttpContext) {
    const id = request.param('id');

    const savedLink = await SavedLink.findOrFail(id);

    return response.ok(savedLink);
  }

  async getSavedLinksByUser({ request, response }: HttpContext) {
    const userId = request.param('userId');

    const savedLinks = await SavedLink.query()
      .where('userId', userId)

    return response.ok(savedLinks);
  }

  async getSavedLinkByUserAndLink({ request, response }: HttpContext) {
    const userId = request.param('userId');
    const linkId = request.param('linkId');

    const savedLink = await SavedLink.query()
      .where('userId', userId)
      .andWhere('linkId', linkId)
      .first()

    return response.ok(savedLink);
  }

  async create({ request, response }: HttpContext) {
    const validatedData = await request.validateUsing(createSavedLinkValidator);
    const iSavedLink = validatedData as ISavedLink;

    const savedLink = await SavedLink.create(iSavedLink);

    return response.ok(savedLink);
  }

  async deleteByUserAndLink({ request, response }: HttpContext) {
    const userId = request.param('userId');
    const linkId = request.param('linkId');

    const savedLink = await SavedLink.query()
      .where('userId', userId)
      .andWhere('linkId', linkId)
      .first()

    if (savedLink) {
      await savedLink.delete();
    }

    return response.ok(savedLink);
  }

  //update doesn't really make sense, is binary exists/not exists
  async update({ request, response, auth }: HttpContext) {
    const id = request.param('id');

    const validatedData = await request.validateUsing(updateSavedLinkValidator);
    const iSavedLink = validatedData as ISavedLink;

    const savedLink = await SavedLink.findOrFail(id);

    //verify that the user owns the savedLink
    if (!auth.user?.id || savedLink.userId !== auth.user.id) {
      return response.unauthorized('You cannot update a savedLink that is not yours');
    }

    savedLink.merge(iSavedLink);
    await savedLink.save();

    return response.ok(savedLink);
  }

  async delete({ request, response }: HttpContext) {
    const id = request.param('id');

    const savedLink = await SavedLink.findOrFail(id);
    await savedLink.delete();

    return response.ok(savedLink);
  }

  async deleteAll({ response }: HttpContext) {
    await SavedLink.truncate(true);

    return response.ok("All savedLinks deleted!");
  }
}
