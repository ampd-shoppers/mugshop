const router = require('express').Router()
const {CartItem, User, Mug} = require('../db/models')
module.exports = router

//TODO check these routes before implementing fully

router.get('/user', async (req, res, next) => {
  try {
    const userCart = await CartItem.findAll({
      where: {userId: req.user.dataValues.id}
      //TODO: eagerloading mug
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
    console.log(
      'Hi from postCart API, ',
      req.body.mugId,
      ' UserId: ',
      req.user.dataValues.id
    )
    // const items = await CartItem.create(req.body)
    // res.json(items)

    const addedItem = await CartItem.findOrCreate({
      where: {
        mugId: req.body.mugId,

        //TODO: NOT LOGGED IN NULL CASE
        userId: req.user.dataValues.id
      },

      defaults: {
        quantity: 1
      }
    })

    res.json(addedItem)
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

router.delete('/user/:id', async (req, res, next) => {
  try {
    console.log('route delete ', req.params.id)
    const mugId = req.params.id
    if (mugId) {
      CartItem.destroy({where: {mugId}})
    } else {
      res.send('cannot delete mug')
    }
    // await CartItem.destroy({where: {mugId}})
    // res.status(204).end()
  } catch (err) {
    next(err)
  }
})
