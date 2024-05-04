function normalizeURL(url) {
    let urlObj = new URL(url)
    return urlObj.hostname
}



export { normalizeURL };