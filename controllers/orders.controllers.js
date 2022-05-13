const { catchAsync } = require('../utils/catchAsync')
const { Order } = require('../models/order.model')
const { Meal } = require('../models/meal.model')
const { Restaurant } = require('../models/restaurant.model')

const { AppError } = require('../utils/appError')

const createOrder = catchAsync(async (req, res, next) => {
  const { userSession } = req
  const { quantity, mealId } = req.body

  const meal = await Meal.findOne({
    where: { id: mealId, status: 'active' }
  })

  if (!meal) {
    return next(new AppError('Meal does not exist with given Id', 404))
  }

  const newOrder = await Order.create({
    mealId: meal.id,
    userId: userSession.id,
    price: quantity * 1 * meal.price,
    quantity
  })

  res.status(201).json({ newOrder })
})

const getUserOrders = catchAsync(async (req, res, next) => {
  const { userSession } = req

  const userOrders = await Order.findAll({
    where: { userId: userSession.id },
    include: [
      {
        model: Meal,
        include: { model: Restaurant }
      }
    ]
  })

  res.status(200).json({ userOrders })
})

const completeOrder = catchAsync(async (req, res, next) => {
  const { order } = req

  await order.update({ status: 'completed' })

  res.status(200).json({ status: 'success' })
})

const deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req

  await order.update({ status: 'cancelled' })

  res.status(200).json({ status: 'success' })
})

module.exports = {
  createOrder,
  getUserOrders,
  completeOrder,
  deleteOrder
}
