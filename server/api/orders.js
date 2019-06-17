const router = require('express').Router()
const {CartItem, User, Mug, Order, OrderItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const userOrders = await Order.findAll({
      where: {userId: req.user.id}
    })
    res.json(userOrders)
  } catch (err) {
    next(err)
  }
})
router.get('/all', async (req, res, next) => {
  try {
    if (req.isAdmin) {
      let allOrders = await Order.findAll()
      res.json(allOrders)
    } else {
      res.send(
        'You are not an Admin. Please log in or contact support if this is not correct'
      )
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const orderId = await OrderItem.findAll({
      where: {orderId: req.params.orderId},
      include: [
        {
          model: Mug
        }
      ]
    })
    if (orderId) {
      res.json(orderId)
    } else {
      res.send('order not found')
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const orderId = await OrderItem.findAll({
      where: {orderId: req.params.orderId},
      include: [
        {
          model: Mug
        }
      ]
    })
    if (orderId) {
      res.json(orderId)
    } else {
      res.send('order not found')
    }
  } catch (err) {
    next(err)
  }
})
