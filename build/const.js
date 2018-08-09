const utils = require('./utils')
const config = require('../config')

exports.entries = utils.findEntry(`${config.base.projectsSubDirectory}/*/index.js`)
exports.pages = utils.findEntry(`${config.base.projectsSubDirectory}/*/index.pug`)