import { DateTime, Duration } from 'luxon';


export function isOnMobile() {
    return window.innerWidth < 800;
}

export function getDateTimeStringNow() {
    return DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss');
}

export function getDateTimeString(date) {
    return DateTime.fromJSDate(date).toFormat('yyyy-MM-dd HH:mm:ss');
}

function assertHasProperties(obj, properties) {
    let missingProperties = [];
    properties.forEach(property => {
        if (!Object.prototype.hasOwnProperty.call(obj, property)) {
            missingProperties.push(property);
        }
    });
    if (missingProperties.length > 0) {
        console.log(`${obj} is missing properties: ${missingProperties.join(', ')}`);
        throw new Error(`Missing properties: ${missingProperties.join(', ')}`);
    }
}

// create DTOs
export function  createUserDto(data) {
    assertHasProperties(data, ['username', 'email', 'password']);
    return {
        username: data.username,
        email: data.email,
        password: data.password,
        date: getDateTimeStringNow()
    };
}

export function updateUserDto(data) {
    assertHasProperties(data, ['username']);
    return {
        username: data.username,
        email: data.email,
        password: data.password,
        date: getDateTimeStringNow()
    };
}

export function upgradeGuestUserDto(data) {
    console.log(data)
    assertHasProperties(data, ['id', 'email', 'password']);
    return {
        id: data.id,
        email: data.email,
        password: data.password,
        date: getDateTimeStringNow()
    };
}



export function createGuestUserDto(data) {
    return {
        isGuest: true,
        date: getDateTimeStringNow()
    };
}

export function createLinkDto(data) {
    assertHasProperties(data, ['url', 'userId']);
    let link = {
        url: data.url,
        domain: null,
        contentId: null,
        startTime: data.startTime || null,
        endTime: data.endTime || null,
        duration: data.duration || null,
        isClip: data.isClip || false,
        //note: loopClip unused, set to true by default
        loopClip: data.loopClip || false,
        embeddable: data.embeddable || false,
        title: data.title || "New Link",
        description: data.description || "Description here",
        date: getDateTimeStringNow(),
        userId: data.userId,
        originalLinkId: data.originalLinkId || null
    };
    link = extractDomain(link);
    link = extractContentId(link);
    link = processLink(link);
    
    return link;
}

export function updateLinkDto(data) {
    assertHasProperties(data, ['id']);

    data.date = getDateTimeStringNow();
    
    return data;
}

export function createVoteDto(data) {
    assertHasProperties(data, ['linkId', 'userId', 'voteValue']);
    return {
        linkId: data.linkId,
        userId: data.userId,
        voteValue: data.voteValue,
        date: getDateTimeStringNow()
    };
}

export function createCommentDto(data) {
    assertHasProperties(data, ['content', 'userId', 'linkId']);
    return {
        content: data.content,
        linkId: data.linkId,
        userId: data.userId,
        date: getDateTimeStringNow()
    };
}

export function createSavedLinkDto(data) {
    assertHasProperties(data, ['userId', 'linkId']);
    return {
        userId: data.userId,
        linkId: data.linkId,
        date: getDateTimeStringNow()
    };
}

export function createTagDto(data) {
    assertHasProperties(data, ['name', 'userId']);
    return {
        name: data.name.toLowerCase(),
        userId: data.userId,
        date: getDateTimeStringNow()
    };
}

export function createTagLinkDto(data) {
    assertHasProperties(data, ['linkId', 'tagId']);
    return {
        linkId: data.linkId,
        tagId: data.tagId,
        userId: data.userId || null,
        date: getDateTimeStringNow()
    };
}

export function createUserActionDto(data) {
    assertHasProperties(data, ['userId', 'actionType', 'itemId']);
    return {
        userId: data.userId,
        itemId: data.itemId,
        actionType: data.actionType,
        date: getDateTimeStringNow()
    };
}

// create link to archive.is
export function createArchiveLink(link) {
    let url = link.url;
    let archiveUrl = "https://archive.is/newest/" + url;
    return archiveUrl;
}

// bonus processing functions

export function extractDomain(link) {
    let url = link.url;
    // Remove protocol (http://, https://) and www if present
    let simplifiedUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '');

    // Extract the domain name (top-level site)
    let domainName = simplifiedUrl.split('/')[0]; // Split by '/' and take the first element

    // Remove any trailing slashes from the domain name
    domainName = domainName.replace(/\/$/, '');

    // If domain starts with 'm.', remove it
    if (domainName.startsWith('m.')) {
        domainName = domainName.slice(2);
    }

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
        //params get added back in when the link is loaded
        url = "https://www.youtube.com/embed/" + contentId;

    }
    
    link.url = url;
    return link
}

//save the youube URL query params as fields in the link object
// then when the link is loaded, add the query params to the youtube url
export function loadYoutubeUrl(link) {
    let url = link.url;
    let paramsList = [];
    if(link.isClip && link.startTime && link.endTime) {
        paramsList.push("start=" + link.startTime);
        paramsList.push("end=" + link.endTime);

        //clips should loop by default
        paramsList.push("loop=1");
        //clips should turn off controls by default
        paramsList.push("controls=0");
    }

    //turn off related videos by default
    paramsList.push("rel=0");

    //autoplay should be a user setting, set to true by default
    paramsList.push("autoplay=1");

    if(paramsList.length > 0) {
        url += "?" + paramsList.join("&");
    }

    link.url = url;
    return link;
}

export function encodeURIComponent(str) {
    return str
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A')
        .replace(/~/g, '%7E');
}

//trim the http:// or https:// from the url for display
export function trimUrlForDisplay(url) {
    if (!url) {
        return '';
    }
    return url.replace(/^(https?:\/\/)?(www\.)?/, '');
}

export function convertDateToTimeAgo(date) {
    console.log(date)
    if (!date) {
        return '';
    }
    let parsedDate = DateTime.fromISO(date);
    return parsedDate.toRelative();
}