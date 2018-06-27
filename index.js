const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const {Pool, Client} = require('pg');

const rating = require('./lib/ratings')
const utils = require('./lib/utils')
let config = require('./config/development')

// Database connection
let connectionString = 'localhost:5432'
const pool = new Pool(connectionString)

const app = express()
app.use(bodyParser.json())
app.use(cors())

/*
    GET /login/:userId
    Confirm existence of a user
*/
app.get('/login/:userId', function (req, res, next) {
    let userId = parseInt(req.params.userId)

    utils.log(`GET login attempt, userID: ${userId}`)

    let queryString = `
        SELECT * FROM users WHERE id = ${userId};
    `
    pool.query(queryString, (err, result) => {
        if (err || result.rows.length === 0) {
            console.error(err)
            res.status(404)
            res.json({response: "failure", userId: null})
            return
        }
        // return success response and userId return status 200
        res.json({response: "success", userId: result.rows[0].id})

    })
})

/*
    POST /rating
    Create a rating of content by a user
*/
app.post('/rating', function (req, res, next) {
    let data = req.query

    if (![1, 2, 3, 4, 5].includes(parseInt(data.rating))) { // ensure rating is one of 1-5
        res.status(400)
        res.json({response: "failure"})
        return
    }

    utils.log(`POST content rate request from user ${data.userId} for content ${data.contentId} (${data.rating} stars)`)

    let queryString = `
        INSERT INTO ratings(user_ID, content_ID, rating)
            VALUES (${data.userId}, ${data.contentId}, ${data.rating})
    `

    pool.query(queryString, (err, result) => {
        if (err) {
            console.error(err)
            res.status(404)
            res.json({response: "failure"})
            return
        }
        // update average rating of this content
        rating.updateContentAverageRating(pool, data.contentId)

        // return success response return status 200
        res.json({response: "success"})

    })
})

/*
    GET /rating/:contentId
    Retrieve a content's average rating by contentId
*/
app.get('/rating/:contentId', function (req, res, next) {
    let contentId = req.params.contentId

    utils.log(`GET average rating for ${contentId}`)

    let queryString = `
        SELECT * FROM contents WHERE id = ${contentId}
    `

    pool.query(queryString, (err, result) => {
        if (err || result.rows.length === 0) {
            console.error(err)
            res.status(404)
            res.json({response: "failure"})
            return
        }
        // return success response along with contentId and rating return status 200
        res.json({response: "success", contentId: result.rows[0].id, rating: result.rows[0].average_rating})

    })
})

/*
    GET /content
    Retrieve list of content in the Database
*/
app.get('/content', function (req, res, next) {

    utils.log(`GET list of content`)

    let queryString = `
        SELECT * FROM contents;
    `

    pool.query(queryString, (err, result) => {
        if (err) {
            console.error(err)
            res.status(404)
            return
        }
        // return array of content objects return status 200
        res.json({
            content: result
                .rows
                .map(row => {
                    return {contentId: row.id, title: row.title, average: row.average_rating}
                })
        })
    })
})

app.listen(config.app.port, function (err) {
    if (err) {
        throw err
    }
    utils.log(`Listening on port ${config.app.port}`)
})

module.exports = {
    app,
    pool
}