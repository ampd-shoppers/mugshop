'use strict'

const db = require('../server/db')
const {User, Mug, Tag} = require('../server/db/models')
const Faker = require('faker')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  //Users
  let i

  for (i = 0; i < 1000; i++) {
    let dummyUser = await User.findOrCreate({
      where: {
        firstName: Faker.name.firstName(),
        lastName: Faker.name.lastName(),
        get email() {
          return Faker.internet.email(this.firstName, this.lastName)
        }
      },
      defaults: {
        password: '1234',
        permissionLevel: 'User'
      }
    })
  }
  console.log(`seeded users`)

  //Mugs

  for (i = 0; i < 1100; i++) {
    let adj1 = Faker.commerce.productAdjective()
    let adj2 = Faker.commerce.productAdjective()
    let color = Faker.commerce.color()
    let colorFormat = color[0].toUpperCase() + color.slice(1)

    let checkDups = await Mug.findAll({
      where: {name: `${adj1} ${adj2} ${colorFormat} Mug`}
    })
    if (checkDups[0]) {
      console.log('hi')
      continue
    }

    let mug = await Mug.create({
      name: `${adj1} ${adj2} ${colorFormat} Mug`,
      currentPrice: Faker.finance.amount(0, 20, 2),
      stock: Faker.random.number(1000),
      imgSRC: `/public/imgs/mugs/mug${i % 21}-min.jpeg`
    })

    //console.log(dummyMug[0].dataValues.id)
    let tag1 = await Tag.findOrCreate({
      where: {
        tag: adj1
      }
    })
    // console.log(tag1)
    let tag2 = await Tag.findOrCreate({
      where: {
        tag: adj2
      }
    })

    let tagColor = await Tag.findOrCreate({
      where: {
        tag: colorFormat
      }
    })
    // console.log(Object.keys(mug.__proto__))
    await mug.addTag(tag1[0].dataValues.id)
    await mug.addTag(tag2[0].dataValues.id)
    await mug.addTag(tagColor[0].dataValues.id)
  }

  console.log(`seeded mugs`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
