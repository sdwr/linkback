import { fetchYoutubeData } from "./youtubeapi";

const externalApi = {
  addSiteData: async (link) => {
    let domain = link.domain;
    let contentId = link.contentId;
  
    //get title + description
    if(domain === "youtube.com" || domain === "youtu.be") {
        let data = await fetchYoutubeData(contentId);
        if(data) {
            link.title = data.title;
            link.description = data.description;
            link.duration = data.duration;
        }
    } else {
        //TODO: get title and description for other sites
    }

    //TODO: get thumbnail

    //find out if link can load in iframe
    let canLoadInIframe = await externalApi.canLoadInIframe(link);
    link.embeddable = canLoadInIframe;
    
    return link
  },
  canLoadInIframe: async (link) => {
    try {
      let domain = link.domain;
  
      if(domain === "youtube.com" || domain === "youtu.be") {
          return true;
      } else {
        let url = link.url;
        let response = await fetch(url, {method: 'HEAD'});
        let xFrameOptions = response.headers.get('x-frame-options');
        let contentSecurityPolicy = response.headers.get('content-security-policy');
  
        if(xFrameOptions || contentSecurityPolicy) {
          return false;
        } else {
          return true;
        }
      }
    } catch(error) {
      console.error("Error checking if link can load in iframe: ", error);
    }
    return false;
  },
}

export default externalApi;