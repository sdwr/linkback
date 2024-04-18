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
    let image = null

    //if youtube, get thumbnail from youtube
    if(url.toLowerCase().includes('youtube.com')) {
      image = await this.fetchYoutubeThumbnail(url);
    }
    //try OG
    if(!image) {
      image = await this.fetchOGThumbnail(url);
    }

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

  //duplicates extracting the contentID from the url
  //but its fine
  //note that all youtube urls are converted to embed urls in the frontend
  //and have query parameters removed
  async fetchYoutubeThumbnail(url: string) {
    let contentId = url.split('embed/')[1];
    if(!contentId) {
      return null;
    }

    let imageUrl = `https://img.youtube.com/vi/${contentId}/0.jpg`;
    let image = await this.fetchImageFromUrl(imageUrl);
    return image;
  }
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
      //launch puppeteer
      //insecure mode for now
      const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
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
      let ogUrl = $('meta[property="og:image"]').attr('content');
      
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