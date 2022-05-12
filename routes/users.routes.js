const express = require('express')

const {
  signup,
  login,
  updateUser,
  deleteUser,
  getUserOrders,
  getOrderById
} = require('../controllers/users.controllers')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)

router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)
router.get('/orders', getUserOrders)
router.get('/orders/:id', getOrderById)

module.exports = { userRouter: router }
