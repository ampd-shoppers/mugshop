const router = require('express').Router()
const User = require('../db/models/user')
const cartItem = require('../db/models/cartItem')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      const guestCart = await cartItem.findAll({
        where: {sessionId: req.sessionID}
      })
      const userCart = await cartItem.findAll({
        where: {userId: user.id}
      })
      if (guestCart) {
        for (let i in guestCart) {
          let mugDuplicate = false
          for (let j in userCart) {
            if (guestCart[i].mugId === userCart[j].mugId) {
              mugDuplicate = true
            }
          }
          if (mugDuplicate === false) {
            await guestCart[i].update({
              userId: user.id
            })
          }
        }
      }
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
