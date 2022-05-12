const express = require('express')

const {
  createOrder,
  getUserOrders,
  completeOrder,
  deleteOrder
} = require('../controllers/orders.controllers')

const { protectToken, protectAccountOwner } = require('../middlewares/users.middlewares')

const { mealExist } = require('../middlewares/meals.middlewares')

const router = express.Router()

router.use('/', protectToken)

router.post('/', createOrder)
router.get('/me', getUserOrders)
router.patch('/id', mealExist, protectAccountOwner, completeOrder)
router.delete('/id', mealExist, protectAccountOwner, deleteOrder)

module.exports = { ordersRouter: router }
