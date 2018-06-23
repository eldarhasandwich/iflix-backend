const path = require('path')

const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')

let db = require('./queries')
let config = require('./config/development')

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.post('/rating', function (req, res) {
    let userId = req.query.userId
    let contentId = req.query.contentId
    let rating = req.query.rating

    console.log(`POST content rate request from user ${userId} for content ${contentId} (${rating} stars)`)
    
    res.json({
        response: "success"
    })

})

app.get('/rating/:contentId', function (req, res) {
    let contentId = req.params.contentId

    console.log(`GET average rating for ${contentId}`)
    res.json({
        contentId: contentId,
        average: 3.2
    })
})

app.listen(config.app.port, function (err) {
    if (err) {
        throw err
    }

    console.log("Backend is running. Waiting for requests.")
})