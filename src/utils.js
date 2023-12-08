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

export function createLinkDto(data) {
    let domain = extractDomain(data.url);

    return {
        linkId: getNextId(),
        url: data.url,
        domain: domain,
        title: data.title,
        description: data.description,
        submitDate: new Date(),
        userId: data.userId,
        originalLinkId: data.originalLinkId || null
    };
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
        associatedLinkId: data.associatedLinkId || null
    };
}



export function extractDomain(url) {
    // Remove protocol (http://, https://) and www if present
    let simplifiedUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '');

    // Extract the domain name (top-level site)
    let domainName = simplifiedUrl.split('/')[0]; // Split by '/' and take the first element

    // Remove any trailing slashes from the domain name
    domainName = domainName.replace(/\/$/, '');

    return domainName;
}

export function processLink(url) {

    //if the url is to youtube, replace with the embed url
    url = url.replace(/youtube\.com\/watch\?v=/, "youtube.com/embed/");

    return url;
}