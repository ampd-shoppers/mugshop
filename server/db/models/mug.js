const Sequelize = require('sequelize')
const db = require('../db')

const Mug = db.define('mugs', {
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
    allowNull: false
  },
  imgSRC: {
    type: Sequelize.STRING
  }
})
