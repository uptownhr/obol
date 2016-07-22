'use strict'

const path = require('path'),
  util = require('../util')

const routePath = path.join(__dirname, './')
const models = util.generateDirectoryModules(routePath)

module.exports = models
