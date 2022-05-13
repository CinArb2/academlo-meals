const express = require('express')

const {
  createNewRestaurant,
  getActiveRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createNewReview,
  updateReview,
  deleteReview
} = require('../controllers/restaurants.controllers')

const {
  protectToken,
  protectRole
} = require('../middlewares/users.middlewares')

const { restaurantExist, protectOwnerReview } = require('../middlewares/restaurants.middlewares')

const {
  restaurantReviewValidations,
  checkValidations,
  createRestaurantValidations
} = require('../middlewares/validations.middlewares')

const router = express.Router()

router.get('/', getActiveRestaurants)
router.get('/:id', restaurantExist, getRestaurantById)

router.use('/', protectToken)

router.post('/', protectRole, createRestaurantValidations, checkValidations, createNewRestaurant)
router.patch('/:id', protectRole, restaurantExist, updateRestaurant)
router.delete('/:id', protectRole, restaurantExist, deleteRestaurant)

router.post('/reviews/:id', restaurantExist, restaurantReviewValidations, checkValidations, createNewReview)
router.patch('/reviews/:id/:idReview', restaurantExist, protectOwnerReview, restaurantReviewValidations, checkValidations, updateReview)
router.delete('/reviews/:id/:idReview', restaurantExist, protectOwnerReview, deleteReview)

module.exports = { restaurantsRouter: router }
