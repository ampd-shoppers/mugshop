const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  progress: {
    type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed'),
    defaultValue: 'Created'
  },
  dollarTotal: {
    type: Sequelize.DECIMAL(10, 2)
  },
  sessionId: {
    foreignKey: true,
    allowNull: true,
    type: Sequelize.STRING
  }
})

module.exports = Order
