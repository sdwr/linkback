import app from '@adonisjs/core/services/app'
import puppeteer from 'puppeteer'

// keep track of page views based on userSession and userId
export default class ThumbnailService {
  constructor() {}

  async getOne(linkId: number) {
    let path = app.makePath('thumbnails/' + linkId + '.png');
    return path;
  }

  async createOrOverwrite(linkId: number, thumbnail: any) {

    let path = app.makePath('thumbnails/');
    await thumbnail.move((path), {
      name: `${linkId}.png`,
      overwrite: true
    });
    
    return true;
  }

  //fetching functions
  async getThumbnailFromUrl(url: string, id: number) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    console.log('current directory', process.cwd())
    const thumbnail = await page.screenshot({path: `${id}.png`, fullPage: true});
    const thumbnail2 = await page.screenshot({path: `${id}2.png`});
    await browser.close();
    return thumbnail;
  }

  async getThumbnailFromYoutube(url: string, id: number) {
    const YOUTUBE_THUMBNAIL_URL = 'https://img.youtube.com/vi/';

  }

}