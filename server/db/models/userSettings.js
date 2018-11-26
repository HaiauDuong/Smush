const Sequelize = require('sequelize')
const db = require('../db')

const UserSettings = db.define('usersettings', {
  city: {
    type: Sequelize.STRING,
    defaultValue: 'Manhattan'
  }
})

module.exports = UserSettings
