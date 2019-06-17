const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cart_item', {
  sessionId: {
    foreignKey: true,
    allowNull: true,
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = CartItem
