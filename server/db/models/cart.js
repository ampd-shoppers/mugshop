const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  cartStatus: {
    type: Sequelize.ENUM('Active', 'Purchased')
  },
  orderProgress: {
    type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed')
  } //Do we want a 'blank' one for when cart is still open?
})

//Info from Sequelize Documents on join tables:
// If you want additional attributes in your join table, you can define a model for the join table in sequelize, before you define the association, and then tell sequelize that it should use that model for joining, instead of creating a new one:

// class User extends Model {}
// User.init({}, { sequelize, modelName: 'user' })
// class Project extends Model {}
// Project.init({}, { sequelize, modelName: 'project' })
// class UserProjects extends Model {}
// UserProjects.init({
//   status: DataTypes.STRING
// }, { sequelize, modelName: 'userProjects' })

// User.belongsToMany(Project, { through: UserProjects })
// Project.belongsToMany(User, { through: UserProjects })
// To add a new project to a user and set its status, you pass extra options.through to the setter, which contains the attributes for the join table

// user.addProject(project, { through: { status: 'started' }})
