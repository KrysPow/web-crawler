import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";

test('normalize url', () => {
    expect(normalizeURL('https://nodejs.org/api/url.html#url-strings-and-url-objects')).toBe('nodejs.org')
});