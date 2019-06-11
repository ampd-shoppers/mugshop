const Sequelize = require('sequelize')
const db = require('../db')

const Mug = db.define('mug', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  currentPrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  imgSRC: {
    type: Sequelize.STRING
  }
})

module.exports = Mug
