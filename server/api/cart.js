const router = require('express').Router()
const {CartItem, User, Mug} = require('../db/models')
module.exports = router

//TODO check these routes before implementing fully

router.use((req, res, next) => {
  // console.log(req.session)
  req.session.cartItems = [{productId: 1, quantity: 3}]
  // console.log(req.user)
  next()
})

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
    let response = await CartItem.update(
      {quantity: req.body.qty},
      {where: {mugId: req.params.mugId}}
    )
    res.send(`Updated qty of mug ${req.params.mugId} to ${req.body.qty}`)
  } catch (err) {
    next(err)
  }
})

router.delete('/user/:id', async (req, res, next) => {
  try {
    console.log('route delete ', req.params.id)
    const mugId = req.params.id
    if (mugId) {
      await CartItem.destroy({where: {mugId}})
    } else {
      res.send('cannot delete mug')
    }
    // await CartItem.destroy({where: {mugId}})
    // res.status(204).end()
  } catch (err) {
    next(err)
  }
})
