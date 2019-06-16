const router = require('express').Router()
const {CartItem, User, Mug, Order, OrderItem} = require('../db/models')
module.exports = router

//TODO check these routes before implementing fully

router.use((req, res, next) => {
  //FINNS EXAMPLE
  // console.log(req.session)
  // req.session.cartItems = [{productId: 1, quantity: 3}]
  // console.log(req.session)
  // req.session.cartItems = [{productId: 1, quantity: 3}]
  // console.log(req.user)
  next()
})

//logged in user views their cartItems (forming their cart)
router.get('/user', async (req, res, next) => {
  console.log(req.session.cartItems)
  try {
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

//converts cartitems to orderitems & order
router.get('/user/checkout', async (req, res, next) => {
  try {
    //users current cart
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
      //create orderItems from cartItems & associates them with newOrder
      let newOrderItem = await OrderItem.create({
        quantity: userCart[i].mug.dataValues.quantity,
        purchasePrice: userCart[i].mug.dataValues.currentPrice,
        mugId: userCart[i].mug.dataValues.id,
        orderId: newOrder.dataValues.id
      })

      //update Order dollar Total
      let totalDollars =
        parseFloat(newOrder.dataValues.dollarTotal) +
        parseFloat(newOrderItem.dataValues.purchasePrice)
      await newOrder.update({
        dollarTotal: totalDollars
      })

      //delete cartItem
      await userCart[i].destroy()
    }

    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const targetMug = await Mug.findByPk(req.body.mugId)
    const targetUser = await User.findByPk(req.user.dataValues.id)
    await targetMug.addUser(targetUser)
    await targetUser.addMug(targetMug)

    res.json(targetMug)
  } catch (err) {
    next(err)
  }
})

// router.put('/:userId', async (req, res, next) => {
//   try {
//     const userCart = await CartItem.findByPk(req.params.userId)
//     const updatedCart = await userCart.update(req.body)
//     res.json(updatedCart)
//   } catch (err) {
//     next(err)
//   }
// })
router.put('/:mugId', async (req, res, next) => {
  try {
    await CartItem.update(
      {quantity: req.body.qty},
      {
        where: {mugId: req.params.mugId},
        returning: true
      }
    )
    const updatedMug = await CartItem.findAll({
      where: {mugId: req.params.mugId},
      include: [
        {
          model: Mug
        }
      ]
    })
    res.send(updatedMug[0].dataValues)
  } catch (err) {
    next(err)
  }
})

router.delete('/user/:id', async (req, res, next) => {
  try {
    const mugId = req.params.id
    if (mugId) {
      await CartItem.destroy({where: {mugId}})
      res.status(204).end()
    } else {
      res.send('cannot delete mug')
    }
  } catch (err) {
    next(err)
  }
})
