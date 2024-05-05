import { argv } from 'node:process'
import { crawlPage } from './crawl.js'

async function main() {
    const cmdArgs = argv.slice(2,)
    if (cmdArgs.length < 1) {
        console.log('error, no CLI arguments!')
    } else if (cmdArgs.length > 1) {
        console.log('error, too many CLI arguments')
    } else if (cmdArgs.length === 1) {
        console.log(`start crawling ${cmdArgs[0]} ...`)
    }
    const base_url = 'https://wagslane.dev'
    await crawlPage(base_url)

} 

main()
