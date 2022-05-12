const { body, validationResult } = require('express-validator')

const { AppError } = require('../utils/appError')

const createUserValidations = [
  body('name')
    .notEmpty()
    .withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('role')
    .isIn(['normal', 'admin', ''])
    .withMessage('role does contain invalid value'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
]

const checkValidations = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg)

    const errorMsg = messages.join('. ')

    return next(new AppError(errorMsg, 404))
  }

  next()
}

const createRestaurantValidations = [
  body('name')
    .notEmpty()
    .withMessage('Name cannot be empty'),
  body('address')
    .notEmpty()
    .withMessage('Address cannot be empty'),
  body('rating')
    .notEmpty()
    .withMessage('Rating cannot be empty')
    .isInt({ min: 0, max: 5 })
    .withMessage('rating value must be between 0 to 5')
]

const restaurantReviewValidations = [
  body('comment')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ max: 100 })
    .withMessage('comments must be maximum 100 characters'),
  body('rating')
    .notEmpty()
    .withMessage('Rating cannot be empty')
    .isInt({ min: 0, max: 5 })
    .withMessage('rating value must be between 0 to 5')
]

const mealValidations = [
  body('name')
    .notEmpty()
    .withMessage('Name cannot be empty'),
  body('price')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isCurrency()
    .withMessage('Invalide value')
]

module.exports = {
  createUserValidations,
  checkValidations,
  createRestaurantValidations,
  restaurantReviewValidations,
  mealValidations
}
