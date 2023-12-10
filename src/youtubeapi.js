import { YOUTUBE_API_KEY } from './.secrets.js';

export async function fetchYoutubeDuration(videoId) {

  const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${YOUTUBE_API_KEY}`;

  try {
      const response = await fetch(url);
      const data = await response.json();

      if (!data.items || data.items.length === 0) {
          throw new Error('Video not found');
      }

      const duration = data.items[0].contentDetails.duration;

      return convertTimeToSeconds(duration);

  } catch (error) {
      console.error('Error fetching YouTube data:', error);
  }
}

function convertTimeToSeconds(time) {
  const timeParts = time.match(/(\d+H|\d+M|\d+S)/ig) || [];

  const seconds = timeParts.reduce((acc, part) => {
    const value = parseInt(part);
    if (part.includes('H')) {
      return acc + value * 3600;
    } else if (part.includes('M')) {
      return acc + value * 60;
    } else if (part.includes('S')) {
      return acc + value;
    }
    return acc;
  }, 0);

  return seconds;
}
