const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require('cors')
const connectDatabase = require("./src/config/db")
const morgan = require('morgan')

app.use(cors())
app.use(morgan("dev"))
dotenv.config()
app.use(express.json())
const PORT = process.env.PORT
connectDatabase()

const { notFound, errorHandler } = require("./src/middlewares/errorHandler")

const authRoutes = require('./src/routes/userRoutes.js')
const shopeRoutes = require('./src/routes/shopeRoutes.js')

app.use('/api/user', authRoutes);
app.use('/api/shope', shopeRoutes);

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})

// app.get("/", (req, res) => {
//     res.send("server is running kuliah")
// })