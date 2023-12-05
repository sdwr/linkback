export function createLinkDto(url) {
    return {
        url: url,
        name: url,
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