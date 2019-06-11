const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [5, 300]
    }
  }
})

module.exports = Review
