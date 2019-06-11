const Sequelize = require('sequelize')
const db = require('../db')

const CartItems = db.define('cart_items', {
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = CartItems
