const promise = require('bluebird')

const options = {
    promiseLib: promise
}

const pgp = require('pg-promise')(options)
const connectionString = 'postgres://localhost:5432'
const db = pgp(connectionString)

function postRating(user_ID, content_ID, rating) {

}

function getContentAverageRating (content_ID) {
    db.one('select * from contents where ID = $1', content_ID)
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: 'data',
                    message: 'Retrieved content'
                })
        })
        .catch(function(err) {
            return next(err)
        })
}

module.exports = {
    postRating: postRating,
    getContentAverageRating: getContentAverageRating
}

