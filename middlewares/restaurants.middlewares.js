const { Restaurant } = require('../models/restaurant.model')
// const { Review } = require('../models/review.model')

const { catchAsync } = require('../utils/catchAsync')
const { AppError } = require('../utils/appError')
const { Review } = require('../models/review.model')

const restaurantExist = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const restaurant = await Restaurant.findOne({
    where: { id, status: 'active' },
    include: { model: Review }
  })

  if (!restaurant) {
    return next(new AppError('Restaurant does not exist with given Id', 404))
  }

  req.restaurant = restaurant
  next()
})

const protectOwnerReview = catchAsync(async (req, res, next) => {
  const { userSession } = req
  const { id, idReview } = req.params

  const review = await Review.findOne({
    where: {
      id: idReview,
      userId: userSession.id,
      restaurantId: id
    }
  })

  if (!review) {
    return next(new AppError('Review does not exist with given Id', 404))
  }

  req.review = review

  next()
})

module.exports = {
  restaurantExist,
  protectOwnerReview
}
