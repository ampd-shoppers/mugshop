const router = require('express').Router()
const {CartItem, User} = require('../db/models')
module.exports = router

//TODO check these routes before implementing fully

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const userCart = await CartItem.findAll({
      where: {userId: req.params.userId}
    })
    if (userCart) {
      res.json(userCart)
    } else {
      res.send('you have no items in your cart')
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const items = await CartItem.create(req.body)
    res.json(items)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const userCart = await CartItem.findByPk(req.params.userId)
    const updatedCart = await userCart.update(req.body)
    res.json(updatedCart)
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    await CartItem.destroy({where: {userId}})
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
