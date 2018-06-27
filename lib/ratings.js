
function updateContentAverageRating(pool, contentId) {
    console.log(`Updating average rating for content:${contentId}`)

    let queryString = `
        SELECT * FROM ratings WHERE content_Id = ${contentId}
    `

    pool.query(queryString, (err, result) => {
        if (err) {
            console.error(err)
            return
        }

        reducer = (acc, cur) => acc + parseInt(cur.rating)
        let newAverage = result
            .rows
            .reduce(reducer, 0) / result.rows.length

        let query = {
            text: `UPDATE contents SET average_rating = $1 WHERE ID = $2`,
            values: [newAverage, contentId]
        }

        pool.query(query, (err, result) => {
            if (err) {
                console.error(err)
                return
            }

            console.log(`Updated averageRating of contentId:${contentId} to ${newAverage}`)
        })
    
    })

}

module.exports = {
    updateContentAverageRating
}