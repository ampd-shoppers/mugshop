const router = require('express').Router()
const {CartItem, User, Mug, Order, OrderItem} = require('../db/models')
module.exports = router

//TODO check these routes before implementing fully

router.use((req, res, next) => {
  //FINNS EXAMPLE
  // console.log(req.session)
  // req.session.cartItems = [{productId: 1, quantity: 3}]
  // console.log(req.user)
  next()
})

//logged in user views their cart
router.get('/user', async (req, res, next) => {
  console.log(req.session.cartItems)
  try {
    // console.log(req)
    // console.log(req.user.id)
    const userCart = await CartItem.findAll({
      where: {userId: req.user.id},
      include: [
        {
          model: Mug
        }
      ]
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

router.get('/user/checkout', async (req, res, next) => {
  try {
    const userCart = await CartItem.findAll({
      where: {userId: req.user.id},
      include: [
        {
          model: Mug
        }
      ]
    })

    const newOrder = await Order.create({
      userId: req.user.id,
      dollarTotal: 0
    })

    for (let i = 0; i < userCart.length; i++) {
      let newOrderItem = await OrderItem.create({
        quantity: userCart[i].mug.dataValues.quantity,
        purchasePrice: userCart[i].mug.dataValues.currentPrice,
        mugId: userCart[i].mug.dataValues.id,
        orderId: newOrder.dataValues.id
      })
      console.log(
        newOrder.dataValues.dollarTotal,
        newOrderItem.dataValues.purchasePrice
      )

      let totalDollars =
        parseFloat(newOrder.dataValues.dollarTotal) +
        parseFloat(newOrderItem.dataValues.purchasePrice)

      // await newOrder.update({
      //   dollarTotal: totalDollars
      // })

      // userCart[i].mug.destroy()
    }

    res.json(newOrder)
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

    const targetMug = await Mug.findByPk(req.body.mugId)
    const targetUser = await User.findByPk(req.user.dataValues.id)
    await targetMug.addUser(targetUser)
    await targetUser.addMug(targetMug)

    res.json(targetMug)
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
