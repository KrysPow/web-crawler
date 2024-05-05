import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";


test('normalize url http', () => {
    expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
});

test('normalize url https', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
});

test('normalize caps in url', () => {
    expect(normalizeURL('https://BLOG.boot.dev/path/')).toBe('blog.boot.dev/path')
})

test('get urls from html, 1 link', () => {
    const htmlText = '<a href="https://boot.dev">Learn Backend Development</a>'
    const baseURL = 'https://blog.boot.dev'
    expect(getURLsFromHTML(htmlText, baseURL)[0]).toBe('https://boot.dev/')
})

test('get urls from html, 1 relative link', () => {
    const htmlText = '<a href="/xyz">Learn Backend Development</a>'
    const baseURL = 'https://blog.boot.dev'
    expect(getURLsFromHTML(htmlText, baseURL)[0]).toBe('https://blog.boot.dev/xyz')
})

test('get urls from html, 1 relative link, 1 absolute link', () => {
    const htmlText = '<a href="/xyz">Learn Backend Development</a> blasbafb <a href="https://boot.dev">Learn Backend Development</a>'
    const baseURL = 'https://blog.boot.dev'
    expect(getURLsFromHTML(htmlText, baseURL).length).toBe(2)
})
