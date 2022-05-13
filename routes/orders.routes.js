const express = require('express')

const {
  createOrder,
  getUserOrders,
  completeOrder,
  deleteOrder
} = require('../controllers/orders.controllers')

const { protectToken } = require('../middlewares/users.middlewares')

const {
  orderExist,
  protectOrderOwner
} = require('../middlewares/orders.middlewares')

const router = express.Router()

router.use('/', protectToken)

router.post('/', createOrder)
router.get('/me', getUserOrders)
router.patch('/:id', orderExist, protectOrderOwner, completeOrder)
router.delete('/:id', orderExist, protectOrderOwner, deleteOrder)

module.exports = { ordersRouter: router }
