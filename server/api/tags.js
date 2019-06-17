const router = require('express').Router()
const {Tag, Mug} = require('../db/models')
module.exports = router
// api/tags
router.get('/', async (req, res, next) => {
  try {
    const tags = await Tag.findAll({
      include: [{model: Mug}]
    })
    res.json(tags)
  } catch (err) {
    next(err)
  }
})
