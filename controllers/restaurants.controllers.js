const { catchAsync } = require('../utils/catchAsync')
const { Restaurant } = require('../models/restaurant.model')
const { Review } = require('../models/review.model')

const createNewRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body

  const newRestaurant = await Restaurant.create(
    {
      name,
      address,
      rating
    })

  res.status(201).json({ newRestaurant })
})

const getActiveRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: { status: 'active' },
    include: { model: Review }
  })
  res.status(200).json({ restaurants })
})

const getRestaurantById = catchAsync(async (req, res, next) => {
  const { restaurant } = req

  res.status(200).json({ restaurant })
})

const updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req
  const { name, address } = req.body

  await restaurant.update({ name, address })

  res.status(200).json({ status: 'success' })
})

const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req

  await restaurant.update({ status: 'deleted' })

  res.status(200).json({ status: 'success' })
})

const createNewReview = catchAsync(async (req, res, next) => {
  const { restaurant, userSession } = req
  const { comment, rating } = req.body
  const newReview = await Review.create(
    {
      userId: userSession.id,
      comment,
      rating,
      restaurantId: restaurant.id
    })

  res.status(201).json({ newReview })
})

const updateReview = catchAsync(async (req, res, next) => {
  res.status(200).json({ msg: 'hola mundo' })
})

const deleteReview = catchAsync(async (req, res, next) => {
  res.status(200).json({ msg: 'hola mundo' })
})

module.exports = {
  createNewRestaurant,
  getActiveRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createNewReview,
  updateReview,
  deleteReview
}
