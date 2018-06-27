const utils = require('./utils')

function updateContentAverageRating(pool, contentId) {
    utils.log(`Updating average rating for content:${contentId}`)

    let queryString = `
        SELECT * FROM ratings WHERE content_Id = ${contentId}
    `

    pool.query(queryString, (err, result) => {
        if (err) {} else {
            reducer = (acc, cur) => acc + parseInt(cur.rating)
            let newAverage = result
                .rows
                .reduce(reducer, 0) / result.rows.length

            let queryString = `
                UPDATE contents
                SET average_rating = ${newAverage}
                WHERE ID = ${contentId}
            `

            pool.query(queryString, (err, result) => {
                if (err) {
                    console.error(err)
                } else {
                    // console.log(result)
                    utils.log(`Updated averageRating of contentId:${contentId} to ${newAverage}`)
                }
            })
        }
    })

}

module.exports = {
    updateContentAverageRating
}