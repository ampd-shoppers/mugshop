'use strict'

const db = require('../server/db')
const {User, Mug} = require('../server/db/models')
const Faker = require('faker')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  //Users
  let i
  // for (i = 0; i < 1000; i++) {
  //   let dummyUser = await User.create({
  //     firstName: Faker.name.firstName(),
  //     lastName: Faker.name.lastName(),
  //     get email() {
  //       return Faker.internet.email(this.firstName, this.lastName)
  //     },
  //     password: '1234',
  //     permissionLevel: 'User'
  //   })
  // }
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
  for (i = 0; i < 3000; i++) {
    let dummyMug = await Mug.findOrCreate({
      where: {
        name: `${Faker.commerce.productAdjective()} ${Faker.commerce.productAdjective()} ${Faker.commerce.color()} Mug`
      },
      defaults: {
        // name: `${Faker.commerce.productAdjective()} ${Faker.hacker.adjective()} Mug`,
        currentPrice: Faker.finance.amount(0, 20, 2),
        stock: Faker.random.number(1000),
        imgSRC: '/public/imgs/default-mug.jpg'
      }
    })
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
