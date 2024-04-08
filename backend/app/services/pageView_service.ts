import { DateTime } from 'luxon'
import PageView from '#models/pageView'
// keep track of page views based on userSession and userId
export default class PageViewService {
  constructor() {}

  async addPageView(session, itemId, itemType) {
    let userId = session.get('auth_web')

    if(!userId) {
      console.error('cannot add page view without userId')
      return;
    }

    let pageView = await PageView.query()
      .where('item_id', itemId)
      .andWhere('item_type', itemType)
      .andWhere('user_id', userId)
      .first()

    if(pageView) {
      pageView.date = DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss')
      await pageView.save()
    } else {
      let iPageView = {
        userId,
        itemId,
        itemType,
        date: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss')
      }
      await PageView.create(iPageView)
    }

    return true;
  }

}