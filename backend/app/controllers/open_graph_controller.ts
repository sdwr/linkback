// Import required modules
import type { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'
import * as cheerio from 'cheerio'

export default class OpenGraphController {

    public async fetchImage({ request, response }: HttpContext) {
        try {
            // Get the URL from the request query string
            const url = request.input('url');

            if (!url) {
                return response.status(400).json({ message: 'URL is required' });
            }

            // Fetch the HTML content of the page
            const { data } = await axios.get(url);

            // Load the HTML content into cheerio
            const $ = cheerio.load(data);

            // Extract the og:image content
            const image = $('meta[property="og:image"]').attr('content');

            // Return the og:image URL
            return response.json({ image });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Failed to fetch the OG image.' });
        }
    }
}
