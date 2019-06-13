const router = require('express').Router()
const {CartItem, User, Mug} = require('../db/models')
module.exports = router

//TODO check these routes before implementing fully

router.get('/user', async (req, res, next) => {
  try {
    // console.log(req)
    const userCart = await CartItem.findAll({
      where: {userId: req.user.dataValues.id},
      include: [
        {
          model: Mug
        }
      ]
      // TODO: eagerloading mug

      // const userMug = await Mug.findByPk(userCart.mugId)
      // const cartItem1=userCart[0]
      // console.log(cartItem1.__proto__)

      //    const userCart = await Mug.findAll({
      // include: [{
      //   model: User,
      //   where: {id: req.user.dataValues.id}
      // }]
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

    // const addedItem = await CartItem.findOrCreate({
    //   where: {
    //     mugId: req.body.mugId,
    //
    //     //TODO: NOT LOGGED IN NULL CASE
    //     userId: req.user.dataValues.id
    //   },
    //
    //   defaults: {
    //     quantity: 1
    //   }
    // })

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

router.delete('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    await CartItem.destroy({where: {userId}})
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
