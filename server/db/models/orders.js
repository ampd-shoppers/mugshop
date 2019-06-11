const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('orders', {
  orderProgress: {
    type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed'),
    defaultValue: 'Created'
  },
  orderTotal: {
    type: Sequelize.DECIMAL(10, 2)
  }
})

module.exports = Orders
