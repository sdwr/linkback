import { fetchYoutubeData } from "./youtubeapi";

const externalApi = {
  addSiteData: async (link) => {
    let domain = link.domain;
    let contentId = link.contentId;
  
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
    
    return link
  },
}

export default externalApi;