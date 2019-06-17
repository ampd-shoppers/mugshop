const router = require('express').Router()
const {User, Review, Order, OrderItem, CartItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'firstName']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

const isAdmin = (req, res, next) => {
  if (!req.user) {
    next(new Error('You are not logged in'))
  }
  // console.log(req.user)
  if (req.user.permissionLevel !== 'Admin') {
    next(new Error('You are not an admin'))
  }
  next()
}

//TODO: cleanup
router.get('/1admin', isAdmin, async (req, res, next) => {
  const user1 = await User.findByPk(1)
  user1.permissionLevel = 'Admin'
  await user1.save()
  res.json(user1)
})

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = await User.findByPk(req.params.userId)
    if (userId) {
      res.json(userId)
    } else {
      res.send('user not found')
    }
  } catch (err) {
    next(err)
  }
})
