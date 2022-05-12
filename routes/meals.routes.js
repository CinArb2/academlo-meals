const express = require('express')

const {
  createMeal,
  getActiveMeals,
  getMealById,
  updateMeal,
  deleteMeal
} = require('../controllers/meals.controllers')

const { restaurantExist } = require('../middlewares/restaurants.middlewares')

const { checkValidations, mealValidations } = require('../middlewares/validations.middlewares')

const { mealExist } = require('../middlewares/meals.middlewares')

const { protectToken, protectRole } = require('../middlewares/users.middlewares')

const router = express.Router()

router.get('/', getActiveMeals)
router.get('/:id', mealExist, getMealById)

router.use('/', protectToken)

router.post('/:id', protectRole, restaurantExist, mealValidations, checkValidations, createMeal)
router.patch('/:id', protectRole, mealExist, updateMeal)
router.delete('/:id', protectRole, mealExist, deleteMeal)

module.exports = { mealsRouter: router }
