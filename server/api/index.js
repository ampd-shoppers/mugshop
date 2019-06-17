const router = require('express').Router()

module.exports = router
router.use((req, res, next) => {
  //Add isAdmin to user if user exists

  req.isAdmin = !!(req.user && req.user.permissionLevel === 'Admin')
  console.log(req.isAdmin)
  next()
})

router.use('/users', require('./users'))
router.use('/cart', require('./cart'))
router.use('/mugs', require('./mugs'))
router.use('/reviews', require('./reviews'))
router.use('/tags', require('./tags'))
router.use('/orders', require('./orders'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
