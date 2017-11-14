const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')


// connect to mongo
const mongoUrl = process.env.NODE_ENV === 'test' ? config.testdb : config.db
mongoose.connect(mongoUrl, {useMongoClient: true})
mongoose.Promise = global.Promise

const app = express()

const controllers = require('./controllers/images.js')
app.get('/api/imagesearch/:search', controllers.find)
app.get('/api/latest/imagesearch', controllers.history)

app.listen(config.port)

module.exports = app
