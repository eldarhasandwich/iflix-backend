
const bodyParser = require('body-parser')
const cors = require('cors')


const express = require('express');
// const router = express.Router();
const { Pool, Client } = require('pg');
const path = require('path');
const connectionString = 'postgres://localhost:5432';

let config = require('./config/development')

const pool = new Pool({
    user: 'eldarhasandwich',
    host: connectionString,
    database: 'ratings',
    password: 'password',
    port: 5432
})

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/login/:userId', function (req, res, next) {
    let result = null
    let userId = req.params.userId

    if (userId === 1 || userId === 2 || userId === 3) {
        result = userId
    }

    res.json({
        response: (result) ? "success" : "failure",
        userId: result
    })
})

// POST
// /rating
// Create/update a rating of content by a user
app.post('/rating', function (req, res, next) {
    let data = {
        userId: req.query.userId,
        contentId: req.query.contentId,
        rating: req.query.rating
    }

    console.log(`POST content rate request from user ${data.userId} for content ${data.contentId} (${data.rating} stars)`)

    let queryString = `
        INSERT INTO ratings(id, user_ID, contentID, rating)
        VALUES (${1}, ${data.userId}, ${data.contentId}, ${data.rating})`

    pool.query(queryString, (err, result) => {
            if (err) {
                console.log(err)
                res.json({response: "failure"})
            } else {
                res.json({response: "success"})
            }
        }
    )

    // res.json({
    //     response: "success"
    // })

})

// GET
// /rating/:contentId
// Retrieve a content's average rating by contentId
app.get('/rating/:contentId', function (req, res, next) {
    let contentId = req.params.contentId

    console.log(`GET average rating for ${contentId}`)


    res.json({
        contentId: contentId,
        average: 3.2
    })
})

app.get('/rating/list', function (req, res, next) {
    res.json({
        list: [
            {
                title: "Titanic",
                average: 4
            },
            {
                title: "The Avengers",
                average: 4
            },
            {
                title: "Star Wars IV",
                average: 4
            }
        ]
    })
})

app.listen(config.app.port, function (err) {
    if (err) {
        throw err
    }

    console.log(`Listening on port ${config.app.port}`)
})

