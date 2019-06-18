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
router.get('/all', async (req, res, next) => {
  try {
    if (req.isAdmin) {
      let allUsers = await User.findAll({
        order: [['id', 'ASC']]
      })
      res.json(allUsers)
    } else {
      res.send(
        'You are not an Admin. Please log in or contact support if this is not correct'
      )
    }
  } catch (err) {
    next(err)
  }
})

router.get('/all', async (req, res, next) => {
  try {
    if (req.isAdmin) {
      let allUsers = await User.findAll()
      res.json(allUsers)
    } else {
      res.send(
        'You are not an Admin. Please log in or contact support if this is not correct'
      )
    }
  } catch (err) {
    next(err)
  }
})

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

router.put('/:userId', async (req, res, next) => {
  try {
    if (req.isAdmin) {
      let updatedUser = await User.update(
        {progress: req.body.permissionLevel},
        {
          where: {id: req.params.userId},
          returning: true
        }
      )
      res.json(updatedUser)
    } else {
      res.send(
        'You are not an Admin. Please log in or contact support if this is not correct'
      )
    }
  } catch (err) {
    next(err)
  }
})
