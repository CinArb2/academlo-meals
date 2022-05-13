const { Order } = require('../models/order.model')

const { catchAsync } = require('../utils/catchAsync')
const { AppError } = require('../utils/appError')

const orderExist = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const order = await Order.findOne({
    where: { id, status: 'active' }
  })

  if (!order) {
    return next(new AppError('Order does not exist with given Id', 404))
  }

  // Add user data to the req object
  req.order = order
  next()
})

const protectOrderOwner = catchAsync(async (req, res, next) => {
  const { userSession, order } = req

  if (userSession.id !== order.userId) {
    return next(new AppError('Not authorized', 403))
  }

  next()
})

module.exports = {
  orderExist,
  protectOrderOwner
}
