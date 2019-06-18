const router = require('express').Router()
const {Mug, Tag, Review} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const mugs = await Mug.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'name', 'currentPrice', 'imgSRC'],
      order: [['id', 'DESC']],
      include: [
        {
          model: Tag
        }
      ]
    })
    res.json(mugs)
  } catch (err) {
    next(err)
  }
})

router.get('/all', async (req, res, next) => {
  try {
    if (req.isAdmin) {
      const mugs = await Mug.findAll({
        order: [['id', 'DESC']],
        include: [
          {
            model: Tag
          }
        ]
      })
      res.json(mugs)
    } else {
      res.send(
        'You are not an Admin. Please log in or contact support if this is not correct'
      )
    }
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

router.get('/page/:page', async (req, res, next) => {
  let limit = 20 // number of records per page
  let offset = limit * req.params.page
  try {
    const mugs = await Mug.findAll({
      attributes: ['id', 'name', 'currentPrice', 'imgSRC'],
      order: [['id', 'DESC']],
      limit: limit,
      offset: offset,
      $sort: {id: 1},
      include: [
        {
          model: Tag
        }
      ]
    })
    res.json(mugs)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (req.isAdmin) {
      console.log('req.body', req.body)
      const name = req.body.name
      const currentPrice = parseFloat(req.body.currentPrice)
      const stock = parseInt(req.body.stock, 10)
      const imgSRC = req.body.imgSRC
      let submittedMug =
        req.body.imgSRC === ''
          ? {name, currentPrice, stock}
          : {name, currentPrice, stock, imgSRC}
      console.log(submittedMug)
      let newMug = await Mug.create(submittedMug, {
        include: [
          {
            model: Tag
          }
        ]
      })
      console.log(newMug)
      res.json(newMug)
    } else {
      res.send(
        'You are not an Admin. Please log in or contact support if this is not correct'
      )
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:mugId', async (req, res, next) => {
  try {
    if (req.isAdmin) {
      // console.log('req.body', req.body)
      const name = req.body.name
      const currentPrice = parseFloat(req.body.currentPrice)
      const stock = parseInt(req.body.stock, 10)
      const imgSRC = req.body.imgSRC
      // let submittedMug =
      //   req.body.imgSRC === ''
      //     ? {name, currentPrice, stock}
      //     : {name, currentPrice, stock, imgSRC}
      // console.log(submittedMug)
      let updatedMug = await Mug.update(
        {
          name: name,
          currentPrice: currentPrice,
          stock: stock,
          imgSRC: imgSRC
        },
        {
          where: {id: req.params.mugId},
          returning: true
        }
      )
      // console.log(updatedMug)
      res.json(updatedMug)
    } else {
      res.send(
        'You are not an Admin. Please log in or contact support if this is not correct'
      )
    }
  } catch (err) {
    next(err)
  }
})

//   const mugs = await Mug.findAll({
//       attributes: ['id', 'name', 'currentPrice', 'imgSRC'],
//       limit: limit,
//       offset: offset,
//       $sort: { id: 1 }
//     })
//     res.json()
//     .then((mugs) => {
//       res.status(200).json({'result': mugs, 'count': data.count, 'pages': pages});
//     });
//   })
//   .catch (error) {
// 		res.status(500).send('Internal Server Error');
// 	}});

// router.get('/', async (req, res, next) => {
//   try {
//     const mugs = await Mug.findAll({
//       // explicitly select only the id and email fields - even though
//       // users' passwords are encrypted, it won't help if we just
//       // send everything to anyone who asks!
//       attributes: ['id', 'name', 'currentPrice', 'imgSRC']
//     })
//     res.json(mugs)
//   } catch (err) {
//     next(err)
//   }
// })
