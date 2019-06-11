const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('order_item', {
  quantity: {
    type: Sequelize.INTEGER
  },
  purchasePrice: {
    type: Sequelize.DECIMAL(10, 2)
  }
})

module.exports = OrderItem
