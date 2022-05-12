
const express = require('express')
const rateLimit = require('express-rate-limit')
require('dotenv').config()
const { db } = require('./utils/db')

const { globalErrorHandler } = require('./controllers/error.controllers')

const { userRouter } = require('./routes/users.routes')
const { restaurantsRouter } = require('./routes/restaurants.routes')
const { mealsRouter } = require('./routes/meals.routes')
const { ordersRouter } = require('./routes/orders.routes')

// import Models
const { User } = require('./models/user.model')
const { Order } = require('./models/order.model')
const { Restaurant } = require('./models/restaurant.model')
const { Review } = require('./models/review.model')
const { Meal } = require('./models/meal.model')

const app = express()

app.use(express.json())

// Limit IP requests
const limiter = rateLimit({
  max: 10000,
  windowMs: 1 * 60 * 60 * 1000, // 1 hr
  message: 'Too many requests from this IP'
})

app.use(limiter)

// Endpoints - http://localhost:6000/api/v1/
app.use('/api/v1/users', userRouter)
app.use('/api/v1/restaurants', restaurantsRouter)
app.use('/api/v1/meals', mealsRouter)
app.use('/api/v1/orders', ordersRouter)

// GLOBAL ERROR HANDLER
app.use('*', globalErrorHandler)

db.authenticate()
  .then(() => console.log('successful connection'))
  .catch((err) => console.log(err))

// 1 User <----> M Order
User.hasMany(Order)
Order.belongsTo(User)

// 1 Restaurant <----> M Reviews
Restaurant.hasMany(Review)
Review.belongsTo(Restaurant)

// 1 Restaurant <----> M meals
Restaurant.hasMany(Meal)
Meal.belongsTo(Restaurant)

// 1 order <----> 1 Meal
Meal.hasOne(Order)
Order.belongsTo(Meal)

// sincronizar modelos
db.sync()
  .then(() => console.log('synced database'))
  .catch(err => console.log(err))

const PORT = process.env.PORT || 6000

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`)
})
