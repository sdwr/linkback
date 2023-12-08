export function createLinkDto(url) {
    let domain = extractDomain(url);

    return {
        url: url,
        name: url,
        domain: domain,
        id: url,
    };
}

export function createTagDto(name) {
    return {
        name: name,
        upvotes: 0,
        downvotes: 0,
        associatedLinkId: null,
        id: name,
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