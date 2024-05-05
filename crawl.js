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

async function crawlPage(currentUrl) {
    const currURL = new URL(currentUrl)
    console.log(`...crawling ${currURL.href}`)
    let response
    try {
        response = await fetch(currURL.href)
    } catch (err) {
        console.log(`coulg not reach site, ${err.message}`)
    }

    if (response.status >= 400) {
        console.log(`error ${response.status}`)
        return
    } else if (!response.headers.get('content-type') || !response.headers.get('content-type').includes('text/html')) {
        console.log(`error, non html response: ${response.headers.get('content-type')}`)
        return
    } else {
        console.log(await response.text())
    }
}


export { normalizeURL, getURLsFromHTML, crawlPage };