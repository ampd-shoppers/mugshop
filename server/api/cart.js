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
  // console.log('User Level', req.user && req.user.permissionLevel)
  // req.user.isAdmin=(req.user && req.user.permissionLevel==='Admin')

  next()
})

//logged in user views their cartItems (forming their cart)
router.get('/user', async (req, res, next) => {
  try {
    // console.log(req.sessionID)
    if (req.user) {
      var userCart = await CartItem.findAll({
        where: {userId: req.user.id},
        include: [
          {
            model: Mug
          }
        ]
      })
    } else {
      var userCart = await CartItem.findAll({
        where: {sessionId: req.sessionID},
        include: [
          {
            model: Mug
          }
        ]
      })
    }

    // const userCart = await CartItem.findAll({
    //   where: {userId: req.user.id},
    //   include: [
    //     {
    //       model: Mug
    //     }
    //   ]
    // })

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
    if (req.user) {
      const userCart = await CartItem.findAll({
        where: {userId: req.user.id},
        include: [
          {
            model: Mug
          }
        ]
      })

      for (let i = 0; i < userCart.length; i++) {
        let currentStock = userCart[i].mug.dataValues.stock
        // console.log()
        if (currentStock - userCart[i].quantity < 0) {
          return res.send(
            `There are only ${currentStock} ${
              userCart[i].mug.dataValues.name
            } mugs left!`
          )
          // res.send(`There are only ${currentStock} ${userCart[i].mug.dataValues.name} mugs left!`)
        }
      }

      var newOrder = await Order.create({
        userId: req.user.id,
        dollarTotal: 0
      })

      for (let i = 0; i < userCart.length; i++) {
        //create orderItems from cartItems & associates them with newOrder
        let newOrderItem = await OrderItem.create({
          quantity: userCart[i].dataValues.quantity,
          purchasePrice: userCart[i].mug.dataValues.currentPrice,
          mugId: userCart[i].mug.dataValues.id,
          orderId: newOrder.dataValues.id
        })

        //update Order dollar Total
        let totalDollars =
          parseFloat(newOrder.dataValues.dollarTotal) +
          parseFloat(newOrderItem.dataValues.purchasePrice) *
            parseFloat(newOrderItem.dataValues.quantity)
        await newOrder.update({
          dollarTotal: totalDollars
        })

        // console.log('mug: ', mug[i])
        console.log('is this rendering? ', userCart[i].mug.dataValues.stock)
        console.log('quantity: ', userCart[i].dataValues.quantity)
        //update mug stock
        let updatedStock =
          parseFloat(userCart[i].mug.dataValues.stock) -
          parseFloat(newOrderItem.quantity)
        await userCart[i].mug.update({
          stock: updatedStock
        })

        //delete cartItem
        await userCart[i].destroy()
      }
    } else {
      const userCart = await CartItem.findAll({
        where: {sessionId: req.sessionID},
        include: [
          {
            model: Mug
          }
        ]
      })

      for (let i = 0; i < userCart.length; i++) {
        let currentStock = userCart[i].mug.dataValues.stock
        // console.log()
        if (currentStock - userCart[i].quantity < 0) {
          return res.send(
            `There are only ${currentStock} ${
              userCart[i].mug.dataValues.name
            } mugs left!`
          )
          // res.send(`There are only ${currentStock} ${userCart[i].mug.dataValues.name} mugs left!`)
        }
      }

      var newOrder = await Order.create({
        sessionId: req.sessionID,
        dollarTotal: 0
      })

      for (let i = 0; i < userCart.length; i++) {
        //create orderItems from cartItems & associates them with newOrder
        let newOrderItem = await OrderItem.create({
          quantity: userCart[i].dataValues.quantity,
          purchasePrice: userCart[i].mug.dataValues.currentPrice,
          mugId: userCart[i].mug.dataValues.id,
          orderId: newOrder.dataValues.id
        })

        //update Order dollar Total
        let totalDollars =
          parseFloat(newOrder.dataValues.dollarTotal) +
          parseFloat(newOrderItem.dataValues.purchasePrice) *
            parseFloat(newOrderItem.dataValues.quantity)
        await newOrder.update({
          dollarTotal: totalDollars
        })

        // console.log('mug: ', mug[i])
        console.log('is this rendering? ', userCart[i].mug.dataValues.stock)
        console.log('quantity: ', userCart[i].dataValues.quantity)
        //update mug stock
        let updatedStock =
          parseFloat(userCart[i].mug.dataValues.stock) -
          parseFloat(newOrderItem.quantity)
        await userCart[i].mug.update({
          stock: updatedStock
        })

        //delete cartItem
        await userCart[i].destroy()
      }
    }

    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    // console.log('session ID', req.sessionID)
    // console.log('user id', req.user.id)

    //TODO: userid?
    let exists
    if (req.user) {
      exists = await CartItem.findOne({
        where: {mugId: req.body.mugId, userId: req.user.id}
      })
    } else {
      exists = await CartItem.findOne({
        where: {mugId: req.body.mugId, sessionId: req.sessionID}
      })
    }

    if (!exists) {
      if (req.user) {
        const AddCartItem = await CartItem.create({
          mugId: req.body.mugId,
          userId: req.user.dataValues.id
        })
      } else {
        const AddCartItem = await CartItem.create({
          mugId: req.body.mugId,
          sessionId: req.sessionID
        })
      }

      const targetMug = await Mug.findByPk(req.body.mugId)
      // const targetUser = await User.findByPk(req.user.dataValues.id)

      // const AddCartItem = await CartItem.create({
      //   mugId: req.body.mugId,
      //   userId: userId
      // })
      //TODO: redundant? Can eliminate if eagerloading isnt necessary
      const newCartItem = await CartItem.findOne({
        where: {mugId: req.body.mugId},
        include: [
          {
            model: Mug
          }
        ]
      })
      res.json(newCartItem)
    } else {
      res.send('Already In Cart')
    }
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
