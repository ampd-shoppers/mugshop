const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('orders', {
  progress: {
    type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed'),
    defaultValue: 'Created'
  },
  dollarTotal: {
    type: Sequelize.DECIMAL(10, 2)
  }
})

module.exports = Orders
