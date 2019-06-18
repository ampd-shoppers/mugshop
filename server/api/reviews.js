const router = require('express').Router()
const {Review, Mug, User} = require('../db/models')
module.exports = router

router.get('/:mugId/reviews', async (req, res, next) => {
  try {
    const mugReviews = await Review.findAll({where: {mugId: req.params.mugId}})
    if (mugReviews) {
      res.json(mugReviews)
    } else {
      res.send('no reviews available for this mug')
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/reviews', async (req, res, next) => {
  try {
    const userReviews = await Review.findAll({
      where: {userId: req.params.userId}
    })
    if (userReviews) {
      res.json(userReviews)
    } else {
      res.send('you have no reviews')
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const review = await Review.create(req.body)
    res.json(review)
  } catch (err) {
    next(err)
  }
})

router.put('/:reviewId', async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.reviewId)
    const updatedReview = await review.update(req.body)
    res.json(updatedReview)
  } catch (err) {
    next(err)
  }
})

router.delete('/:reviewId', async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId
    await Review.destroy({where: {reviewId}})
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
