const Sequelize = require('sequelize')
const db = require('../db')

const OrderItems = db.define('order_items', {
  quantity: {
    type: Sequelize.INTEGER
  },
  purchasePrice: {
    type: Sequelize.DECIMAL(10, 2)
  }
})

module.exports = OrderItems
