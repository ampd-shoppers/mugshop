const router = require('express').Router()
const {Tag} = require('../db/models')
module.exports = router
// api/tags
router.get('/', async (req, res, next) => {
  try {
    const tags = await Tag.findAll()
    res.json(tags)
  } catch (err) {
    next(err)
  }
})
