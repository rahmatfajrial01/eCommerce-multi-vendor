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

const authRoutes = require('./src/routes/userRoutes')
const shopeRoutes = require('./src/routes/shopeRoutes')
const productCategoryRoutes = require('./src/routes/productCategoryRoutes')
const bannerRoutes = require('./src/routes/bannerRoutes')
const brandRoutes = require('./src/routes/brandRoutes')
const productRoutes = require('./src/routes/productRoutes')
const cartRoutes = require('./src/routes/cartRoutes')
const rajaOngkirRoutes = require('./src/routes/rajaOngkirRoutes')
const midtransRoutes = require('./src/routes/midtransRoutes')
const orderRoutes = require('./src/routes/orderRoutes')
const order2Routes = require('./src/routes/order2Routes')

app.use('/api/user', authRoutes);
app.use('/api/shope', shopeRoutes);
app.use('/api/product-category', productCategoryRoutes);
app.use('/api/banner', bannerRoutes);
app.use('/api/brand', brandRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/raja-ongkir', rajaOngkirRoutes);
app.use('/api/midtrans', midtransRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/order2', order2Routes);

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})

// app.get("/", (req, res) => {
//     res.send("server is running kuliah")
// })