
const express = require('express')
require('dotenv').config()

const { globalErrorHandler } = require('./controllers/error.controllers')

const { userRouter } = require('./routes/users.routes')

const { db } = require('./utils/db')

const app = express()

app.use(express.json())

// Endpoints - http://localhost:6000/api/v1/
app.use('/api/v1/users', userRouter)

// GLOBAL ERROR HANDLER
app.use('*', globalErrorHandler)

const PORT = process.env.PORT || 6000

db.authenticate()
  .then(() => console.log('successful connection'))
  .catch((err) => console.log(err))

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`)
})
