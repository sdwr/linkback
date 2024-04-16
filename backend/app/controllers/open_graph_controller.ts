// Import required modules
import ThumbnailService from '#services/thumbnail_service';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'
import * as cheerio from 'cheerio'

@inject()
export default class OpenGraphController {
    constructor(protected thumbnailService: ThumbnailService) {}

    public async fetchImage({ request, response }: HttpContext) {
        try {
            // Get the URL from the request query string
            const url = request.input('url');
            const id = request.input('id');

            if (!url) {
                return response.status(400).json({ message: 'URL is required' });
            }

            // Fetch the HTML content of the page
            const { data } = await axios.get(url);

            // Load the HTML content into cheerio
            const $ = cheerio.load(data);
            console.log($)

            // Extract the og:image content
            let image = $('meta[property="og:image"]').attr('content');

            if(image) {
                await this.thumbnailService.createOrOverwrite(id, image);
                return response.json({ image });
            }

            // If no og:image is found, save a screenshot of the page
            let image = await this.thumbnailService.getThumbnailFromUrl(url, id);



            //save the image to the database
            console.log('saving image to database', image)
            await this.thumbnailService.createOrOverwrite(id, image);
            // Return the og:image URL
            return response.json({ image });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Failed to fetch the OG image.' });
        }
    }
}
