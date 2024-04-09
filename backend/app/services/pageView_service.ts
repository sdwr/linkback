import { DateTime } from 'luxon'
import PageView from '#models/pageView'
import UserSession from '#models/userSession'

// keep track of page views based on userSession and userId
export default class PageViewService {
  constructor() {}

  async addPageView(session: any, linkId: number) {
    let userId = session.get('auth_web')
    let sessionToken = session.get('sessionToken')

    if(!userId) {
      console.error('cannot add page view without userId')
      return;
    }

    let userSession = await UserSession.findBy('sessionToken', sessionToken)

    if(!userSession) {
      console.error('cannot add page view without userSession')
      return;
    }

    let pageView = await PageView.query()
      .where('userSessionId', userSession.id)
      .andWhere('linkId', linkId)
      .first()

    if(pageView) {
      pageView.date = DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss')
      await pageView.save()
    } else {
      let iPageView = {
        userSessionId: userSession.id,
        linkId,
        date: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss')
      }
      await PageView.create(iPageView)
    }

    return true;
  }

}