const {User} = require('./server/db/models')
const db = require('./server/db')
const Faker = require('faker')

const seed = async () => {
  try {
    await db.sync({force: true})

    for (let i = 0; i < 1000; i++) {
      let dummyUser = await User.create({
        firstName: Faker.name.firstName(),
        lastName: Faker.name.lastName(),
        email: Faker.internet.email(),
        permissionLevel: 'User'
      })
    }
  } catch (error) {
    console.error(error)
  }
}

try {
  seed().then(() => {
    console.log('Seeding success!')
    db.close()
  })
} catch (error) {
  console.error('Seeding fail')
  console.error(error)
  db.close()
}
