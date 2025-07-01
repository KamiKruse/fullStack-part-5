require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
// const testingRouter = require('./controllers/testing')
const middleware = require('./utils/middleware')
const mongoUrl = config.MONGODB_URI
const app = express()
mongoose.set('strictQuery', false)

mongoose
  .connect(mongoUrl)
  .then(() => {
    logger.info('connected to mongoDB')
  })
  .catch((error) => {
    logger.info('error connecting to mongoDB', error.message)
  })


app.use(middleware.getTokenFrom)
app.use(express.static('dist'))
app.use(middleware.requestLogger)
app.use(express.json())
app.use('/api/login', loginRouter)
app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', userRouter)
// if (process.env.NODE_ENV === 'test') {
//   app.use('/api/testing', testingRouter)
// }
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app
