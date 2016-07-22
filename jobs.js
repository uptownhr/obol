const mongoose = require('mongoose'),
  config = require('./config')

mongoose.connect(config.mongodb)

mongoose.connection.on('error', () => {
  console.log('Mongodb connection error')
  process.exit(1)
})

mongoose.connection.on('connected', () => {
  console.log('mongoose connected', config.port, config.mongodb)
})


const second = 1000,
  minute = second * 60,
  hour = minute * 60,
  day = hour * 24

const generateAuthorizedKeys = require('./jobs/generateAuthorizedKeys')




setInterval(generateAuthorizedKeys, second * 10)


