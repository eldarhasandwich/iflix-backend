const path = require('path')

const express = require('express')

let config = require ('./config/development')

const app = express()

app.listen(config.app.port, function (err) {
    if (err) {
        throw err
    }

    console.log("Backend is running. Waiting for requests.")
})