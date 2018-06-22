const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

let config = require ('./config/development')

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.post('/rating', function (req, res) {
    let userId = req.query.userId
    let contentId = req.query.contentId
    let rating = req.query.rating

    console.log(userId)
    console.log(contentId)
    console.log(rating)
    
    
})

app.get('/rating/:contentId', function (req, res) {
    console.log(req.params.contentId)
    res.json({
            contentId: req.params.contentId,
            average: 3.2
        })
})

app.listen(config.app.port, function (err) {
    if (err) {
        throw err
    }

    console.log("Backend is running. Waiting for requests.")
})