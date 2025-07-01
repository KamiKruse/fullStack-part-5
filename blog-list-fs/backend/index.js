const config = require('./utils/config')
const logger = require('./utils/logger')
const app = require('./app')
const mongoose = require('mongoose')

console.log('connecting to: ', config.MONGODB_URI)
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
    app.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT}`)
    })
  })
  .catch((error) => {
    logger.error('error connecting to database:', error.message)
  })

