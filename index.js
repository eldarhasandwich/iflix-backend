const path = require('path')

const express = require('express')

let config = require ('./config/development')

const app = express()

app.post('/rating', function (req, res) {
    let userId = req.body.userId
    let contentId = req.body.contentId
    let rating = req.body.rating

    console.log(userId + contentId + rating)
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