import { fetchYoutubeData } from "./youtubeapi";

let globalId = 1;

export function getNextId() {
    return ++globalId;
}

export function createUserDto(data) {
    return {
        userId: getNextId(),
        username: data.username,
        email: data.email
    };
}

export async function createLinkDto(data) {

    let link = {
        linkId: getNextId(),
        url: data.url,
        domain: null,
        contentId: null,
        startTime: data.startTime || null,
        endTime: data.endTime || null,
        isClip: data.isClip || false,
        loopClip: data.loopClip || false,
        title: data.title,
        description: data.description,
        submitDate: new Date(),
        userId: data.userId,
        originalLinkId: data.originalLinkId || null
    };
    link = extractDomain(link);
    link = extractContentId(link);
    link = processLink(link);
    
    link = await addYoutubeData(link);
    return link;

}

export function createVoteDto(data) {
    return {
        voteId: getNextId(),
        linkId: data.linkId,
        userId: data.userId,
        voteType: data.voteType,
        voteDate: new Date()
    };
}

export function createCommentDto(data) {
    return {
        commentId: getNextId(),
        content: data.content,
        linkId: data.linkId,
        userId: data.userId,
        commentDate: new Date()
    };
}

export function createSavedLinkDto(data) {
    return {
        savedLinkId: getNextId(),
        userId: data.userId,
        linkId: data.linkId,
        saveDate: new Date()
    };
}

export function createTagDto(data) {
    return {
        tagId: getNextId(),
        name: data.name,
        upvotes: 0,
        downvotes: 0,
        linkId: data.linkId || null
    };
}



export function extractDomain(link) {
    let url = link.url;
    // Remove protocol (http://, https://) and www if present
    let simplifiedUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '');

    // Extract the domain name (top-level site)
    let domainName = simplifiedUrl.split('/')[0]; // Split by '/' and take the first element

    // Remove any trailing slashes from the domain name
    domainName = domainName.replace(/\/$/, '');

    link.domain = domainName;
    return link;
}

export function extractContentId(link) {
    let url = link.url;
    // Regular expression to match different types of YouTube URLs
    const regExp = /^.*(youtu\.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/;
    const match = url.match(regExp);

    let contentId = null;

    if (match && match[2].length === 11) {
        contentId = match[2];
    }

    link.contentId = contentId;
    return link;
}

export function processLink(link) {

    let domain = link.domain;
    let contentId = link.contentId;
    let url = link.url;

    if(domain === "youtube.com" || domain === "youtu.be") {
        //replace with the embed url
        url = "https://www.youtube.com/embed/" + contentId;

        let params = [];
        

        //if the url is to youtube, add the start and end time
        if(link.startTime && link.endTime ) {
            params.push("start=" + link.startTime);
            params.push("end=" + link.endTime);
        }
        if(link.loopClip) {
            params.push("loop=1");
        }

        if(params.length > 0) {
            url += "?" + params.join("&");
        }
        
    }
    
    link.url = url;
    return link
}

export async function addYoutubeData(link) {
    let domain = link.domain;
    let contentId = link.contentId;

    if(domain === "youtube.com" || domain === "youtu.be") {
        let data = await fetchYoutubeData(contentId);
        if(data) {
            link.title = data.title;
            link.description = data.description;
            link.duration = data.duration;
        }
    }
    
    return link
}