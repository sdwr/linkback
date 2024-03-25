
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export async function fetchYoutubeData(videoId) {

  const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails,snippet&key=${YOUTUBE_API_KEY}`;

  try {
      const response = await fetch(url);
      const data = await response.json();

      if (!data.items || data.items.length === 0) {
          throw new Error('Video not found');
      }
      const title = data.items[0].snippet.title;
      const description = data.items[0].snippet.description;
      const duration = data.items[0].contentDetails.duration;
      const thumbnail = data.items[0].snippet.thumbnails.default;
      
      data.title = title;
      data.description = description;
      data.duration = convertTimeToSeconds(duration);
      //not storing thumbnail for now
      //data.thumbnail = thumbnail;
      
      return data;

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
