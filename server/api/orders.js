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
