// const { User } = require('../models/user.model')

const { catchAsync } = require('../utils/catchAsync')

const signup = catchAsync(async (req, res, next) => {
  res.status(200).json({ msg: 'hola mundo' })
})

const login = catchAsync(async (req, res, next) => {
  res.status(200).json({ msg: 'hola mundo' })
})

const updateUser = catchAsync(async (req, res, next) => {
  res.status(200).json({ msg: 'hola mundo' })
})
const deleteUser = catchAsync(async (req, res, next) => {
  res.status(200).json({ msg: 'hola mundo' })
})
const getUserOrders = catchAsync(async (req, res, next) => {
  res.status(200).json({ msg: 'hola mundo' })
})
const getOrderById = catchAsync(async (req, res, next) => {
  res.status(200).json({ msg: 'hola mundo' })
})

module.exports = {
  signup,
  login,
  updateUser,
  deleteUser,
  getUserOrders,
  getOrderById
}
