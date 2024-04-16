import app from '@adonisjs/core/services/app'
import puppeteer from 'puppeteer'
import axios from 'axios'
import * as cheerio from 'cheerio'
import sharp from 'sharp'
import fs from'fs/promises'

// keep track of page views based on userSession and userId
export default class ThumbnailService {
  constructor() {}

  async getOrFetchThumbnail(url: string, id: number) {
    let image = await this.loadThumbnail(id);
    if(image) {
      return image;
    }
    //fetch thumbnail
    await this.fetchThumbnail(url, id);

    //load twice instead of returning the image from fetchThumbnail
    image = await this.loadThumbnail(id);

    return image;
  }

  async fetchThumbnail(url: string, id: number) {
    //try OG first
    let image = await this.fetchOGThumbnail(url);

    //if no OG, try screenshot
    if(!image) {
      image = await this.fetchPageScreenshot(url);
    }

    if(!image) {
      return null;
    }

    return await this.saveImage(image, id);
  }

  //fetching functions
  async fetchOGThumbnail(url: string) {
    let imageUrl = await this.fetchOGUrl(url);
    if(!imageUrl) {
      return null;
    }
    let image = await this.fetchImageFromUrl(imageUrl);
    return image;
  }

  async fetchPageScreenshot(url: string) {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);

      const thumbnail = await page.screenshot();
      await browser.close();

      return thumbnail;
    } catch (error) {
      console.error('Failed to fetch screenshot thumbnail for url', url);
      return null;
    }
  }

  async getThumbnailFromYoutube(url: string, id: number) {
    const YOUTUBE_THUMBNAIL_URL = 'https://img.youtube.com/vi/';

    
  }

  //internal functions
  async saveImage(imageBuffer: any, id: number) {
    console.log('saving image', imageBuffer)
    console.log(typeof imageBuffer)
    try {
      //save image to file
      let path = this.getThumbnailPath(id);
      await sharp(imageBuffer)
        .resize(200, 200, {
          fit: 'contain'
        })
        .toFormat('png')
        .toFile(path)
  
      return path;

    } catch (error) {
      console.error('Failed to save image', error);
      return null;
    }
  }

  getThumbnailPath(id: number) {
    let path = app.makePath('thumbnails/' + id + '.png');
    return path;
  }

  async loadThumbnail(id: number) {
    try {
      let path = await this.getThumbnailPath(id);
      let image = await fs.readFile(path);
      return image;
    } catch {
      return null;
    }
  }

   async deleteThumbnail(id: number) {
    try {
      let path = this.getThumbnailPath(id);
      await fs.unlink(path);
  
      return true;

    } catch (error) {
      console.error('Failed to delete image', error);
      return false;
    }
  }


  //fetching functions

  async fetchOGUrl(url: string) {
    try {
      // Fetch the HTML content of the page
      const { data } = await axios.get(url);
  
      // Load the HTML content into cheerio
      const $ = cheerio.load(data);
  
      // Extract the og:url content
      let ogUrl = $('meta[property="og:url"]').attr('content');
      
      return ogUrl;

    } catch (error) {
      return null;
    }
  }

  async fetchImageFromUrl(url: string) {
    try {
      const response = await axios({
        url,
        method: 'GET',
        responseType: 'arraybuffer'
      });

      return response.data;

    } catch (error) {
      return null;
    }
  }

}