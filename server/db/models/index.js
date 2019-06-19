const User = require('./user')
const CartItem = require('./cartItem')
const OrderItem = require('./orderItem')
const Order = require('./order')
const Mug = require('./mug')
const Review = require('./Review')
const Tag = require('./tag')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Tag.belongsToMany(Mug, {through: 'mug_tag'})
Mug.belongsToMany(Tag, {through: 'mug_tag'})

Review.belongsTo(Mug)
Mug.hasMany(Review)

Mug.belongsToMany(Order, {through: OrderItem})
Order.belongsToMany(Mug, {through: OrderItem})
OrderItem.belongsTo(Order)
OrderItem.belongsTo(Mug)

Order.belongsTo(User, {constraints: false})
User.hasMany(Order)

Review.belongsTo(User)
User.hasMany(Review)

// Mug.belongsToMany(User, {through: CartItem})
// User.belongsToMany(Mug, {through: CartItem})
CartItem.belongsTo(Mug, {constraints: false})
CartItem.belongsTo(User, {constraints: false})
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  CartItem,
  OrderItem,
  Order,
  Tag,
  Review,
  Mug
}
