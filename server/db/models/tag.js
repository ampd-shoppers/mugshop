const Sequelize = require('sequelize')

const db = require('../db')

const Tag = db.define('tags', {
  tag: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
})
