import { argv } from 'node:process'
import { crawlPage } from './crawl.js'
import { printReport } from './report.js'

async function main() {
    const cmdArgs = argv.slice(2,)
    if (cmdArgs.length < 1) {
        console.log('error, no CLI arguments!')
    } else if (cmdArgs.length > 1) {
        console.log('error, too many CLI arguments')
    } else if (cmdArgs.length === 1) {
        console.log(`start crawling ${cmdArgs[0]} ...`)
    }
    const base_url = cmdArgs[0]
    const pages = await crawlPage(base_url)
    printReport(pages)
} 

main()
