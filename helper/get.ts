export const buildWhereClause = (query: any) => {

    if (typeof query==='undefined') {
        console.log("undefined")
        return ''
    }
    const keys = Object.keys(query)
    let stringQuery: any = []
    if (!keys || keys.length === 0) {
        return ''
    }

    keys.forEach( key => {

        if(typeof query[key] === 'string') {
            const item = `${key} = "${query[key]}"`
            stringQuery.push(item)
        }

        if(typeof query[key] !== 'string') {
            const item = `${key} = ${query[key]}`
            stringQuery.push(item)
        }
    })

    return `WHERE ${stringQuery.join(' and ')}`
}

export const buildInsertQuery = (insertData: any) => {

    if (typeof insertData==='undefined') {
        console.log("undefined")
        return ''
    }
    const keys = Object.keys(insertData)
    let stringQuery: any = []
    if (!keys || keys.length === 0) {
        return ''
    }

    keys.forEach( key => {

        if(typeof insertData[key] === 'string') {
            const item = `${key} = "${insertData[key]}"`
            stringQuery.push(item)
        }

        if(typeof insertData[key] !== 'string') {
            const item = `${key} = ${insertData[key]}`
            stringQuery.push(item)
        }
    })

    return `${stringQuery.join(', ')}`
}