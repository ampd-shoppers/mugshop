const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cart_item', {
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = CartItem
