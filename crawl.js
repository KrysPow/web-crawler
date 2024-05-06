import { JSDOM } from 'jsdom'

function normalizeURL(url) {
    const urlObj = new URL(url)
    const normUrl = urlObj.hostname + urlObj.pathname
    return normUrl.slice(0,-1)
}

function getURLsFromHTML(html, baseURL) {
    const dom = new JSDOM(html)
    const anchors = dom.window.document.querySelectorAll('a')
    const absoluteLinks = []
    for (let anchor of anchors) {
        if (anchor.href[0] === '/') {
            absoluteLinks.push(baseURL+anchor.href)
        } else {
            absoluteLinks.push(anchor.href)
        }
    } 
    return absoluteLinks
}

async function crawlPage(baseURL, currentUrl=baseURL, pages={}) {
    if (!currentUrl.includes(baseURL)) {
        return pages
    }
    const norm_currUrl = normalizeURL(currentUrl)
    if (pages[norm_currUrl]) {
        pages[norm_currUrl]++
        return pages
    } else {
        pages[norm_currUrl] =  1
    }
    const html_body = await fetching(currentUrl)
    const all_urls = getURLsFromHTML(html_body, baseURL)
    for (let fetched_url of all_urls) {
        await crawlPage(baseURL, fetched_url, pages)
    }
    return pages
}

async function fetching(url) {
    const currURL = new URL(url)
    console.log(`...crawling ${currURL.href}`)
    let response
    try {
        response = await fetch(currURL.href)
    } catch (err) {
        console.log(`could not reach site, ${err.message}`)
        return
    }

    if (response.status >= 400) {
        console.log(`error ${response.status}`)
        return
    } else if (!response.headers.get('content-type') || !response.headers.get('content-type').includes('text/html')) {
        console.log(`error, non html response: ${response.headers.get("content-type")}`)
        return
    } else {
        const body = await response.text()
        return body
    }
}





export { normalizeURL, getURLsFromHTML, crawlPage };