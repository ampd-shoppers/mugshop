const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  stars: {
    type: Sequelize.INTEGER,
    validate: {
      max: 5,
      min: 1
    }
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      len: [5, 300]
    }
  }
})

module.exports = Review
