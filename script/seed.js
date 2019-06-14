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
    //setting adjectives so can be used in multiple places
    let adj1 = Faker.commerce.productAdjective()
    let adj2 = Faker.commerce.productAdjective()
    let color = Faker.commerce.color()
    let colorFormat = color[0].toUpperCase() + color.slice(1)
    //checking to see if mug name already exists
    let checkDups = await Mug.findAll({
      where: {name: `${adj1} ${adj2} ${colorFormat} Mug`}
    })
    //if findAll returns a value then continue to next iteration
    if (checkDups[0]) {
      continue
    }
    //otherwise create a new mug with these values
    let mug = await Mug.create({
      name: `${adj1} ${adj2} ${colorFormat} Mug`,
      currentPrice: Faker.finance.amount(0, 20, 2),
      stock: Faker.random.number(1000),
      imgSRC: `/public/imgs/mugs/mug${i % 21}-min.jpeg`
    })

    //create a tag with adjective
    let tag1 = await Tag.findOrCreate({
      where: {
        tag: adj1,
        category: 'type'
      }
    })
    //create a tag with adjective
    let tag2 = await Tag.findOrCreate({
      where: {
        tag: adj2,
        category: 'type'
      }
    })
    //create a tag with color
    let tagColor = await Tag.findOrCreate({
      where: {
        tag: colorFormat,
        category: 'color'
      }
    })
    //add associations for the mug and the adjectives in title/name
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
