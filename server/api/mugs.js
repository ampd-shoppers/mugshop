const router = require('express').Router()
const {Mug, Tag, Review} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log('hi')
    console.log(req.sessionID)
    console.log(req.user)
    const mugs = await Mug.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'name', 'currentPrice', 'imgSRC']
    })
    res.json(mugs)
  } catch (err) {
    next(err)
  }
})

router.get('/:mugId', async (req, res, next) => {
  try {
    const mugId = await Mug.findByPk(req.params.mugId)
    console.log(Object.getPrototypeOf(mugId))
    if (mugId) {
      res.json(mugId)
    } else {
      res.send('mug not found')
    }
  } catch (err) {
    next(err)
  }
})
