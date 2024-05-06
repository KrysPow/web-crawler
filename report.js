function printReport(pages) {
    const longestKeyhalf = Math.floor(findMaxKeyLength(Object.keys(pages))/2)
    console.log(longestKeyhalf)
    console.log(`\n\n${'#'.repeat(longestKeyhalf)} Start Report ${'#'.repeat(longestKeyhalf)}\n`)
    const sorted_arr = sort_by_entries(pages)
    for (let kv of sorted_arr) {
        console.log(`Found ${kv[1]} internal links to ${kv[0]}`)
    }
}


function sort_by_entries(pages) {
    return Object.entries(pages).sort((a,b) => b[1] - a[1])
}

function findMaxKeyLength(arr) {
    let maxLength = 0
    for (let item of arr) {
        if (item.length > maxLength) {
            maxLength = item.length
        }
    }
    return maxLength
}

export {printReport} 