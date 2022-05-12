const { Meal } = require('../models/meal.model')

const { catchAsync } = require('../utils/catchAsync')
const { AppError } = require('../utils/appError')

const mealExist = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const meal = await Meal.findOne({
    where: { id, status: 'active' }
  })

  if (!meal) {
    return next(new AppError('Meal does not exist with given Id', 404))
  }

  // Add user data to the req object
  req.meal = meal
  next()
})

module.exports = { mealExist }
