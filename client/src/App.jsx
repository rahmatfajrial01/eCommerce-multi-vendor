import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Cart from './pages/Cart'
import ChangePassword from './pages/ChangePassword'
import Detail from './pages/Detail'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Login from './pages/Login'
import { NotFound } from './pages/NotFound'
import Order from './pages/Order'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Store from './pages/Store'
import VerifieEmail from './pages/VerifieEmail'
import Wishlist from './pages/Wishlist'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { OpenRoutes } from './routing/openRoutes'
import { PrivateRoutes } from './routing/privateRoutes'

import SecondLayout from './components/Admin/SecondLayout'
import Dashboard from './pages/Admin/Dashboard'
import User from './pages/Admin/User'
import Category from './pages/Admin/Category'
import RegisterAdmin from './pages/Admin/Register'
import Product from './pages/Admin/Product'
import Banner from './pages/Admin/Banner'
import Order2 from './pages/Admin/Order'
import Brand from './pages/Admin/Brand'
import ListProduct from './pages/Admin/ListProduct'
import ListAllProduct from './pages/Admin/ListAllProduct'
import ScrollToTop from './components/ScrollToTop'
import Checkout from './pages/Checkout'
import ThirdLayout from './components/User/ThirdLayout'
import Address from './pages/Address'
import { AdminRoutes } from './routing/adminRoutes'
import AdminAddress from './pages/Admin/ShopeSetting'
import Seller from './pages/Admin/Seller'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path=':id' element={<Detail />} />
          <Route path='store' element={<Store />} />
          <Route path='cart' element={<PrivateRoutes><Cart /></PrivateRoutes>} />
          {/* <Route path='wishlist' element={<PrivateRoutes><Wishlist /></PrivateRoutes>} /> */}
          {/* <Route path='order' element={<PrivateRoutes><Order /></PrivateRoutes>} /> */}
          {/* <Route path='profile' element={<PrivateRoutes><Profile /></PrivateRoutes>} /> */}
          <Route path='checkout' element={<PrivateRoutes><Checkout /></PrivateRoutes>} />
          <Route path='user' element={<PrivateRoutes><ThirdLayout /></PrivateRoutes>} >
            <Route index element={<Profile />} />
            <Route path='order' element={<Order />} />
            <Route path='address' element={<Address />} />
            <Route path='wishlist' element={<Wishlist />} />
          </Route>
        </Route>

        <Route path='/admin/register' element={<PrivateRoutes><RegisterAdmin /></PrivateRoutes>} />
        <Route path='/admin' element={<PrivateRoutes><SecondLayout /></PrivateRoutes>} >
          <Route index element={<Dashboard />} />
          <Route path='user' element={<AdminRoutes><User /></AdminRoutes>} />
          <Route path='category' element={<AdminRoutes><Category /></AdminRoutes>} />
          <Route path='banner' element={<AdminRoutes><Banner /></AdminRoutes>} />
          <Route path='brand' element={<AdminRoutes><Brand /></AdminRoutes>} />
          <Route path='list-all-product' element={<AdminRoutes><ListAllProduct /></AdminRoutes>} />
          <Route path='product' element={<Product />} />
          <Route path='product/:slug' element={<Product />} />
          <Route path='list-product' element={<ListProduct />} />
          <Route path='order' element={<Order2 />} />
          <Route path='shope-setting' element={<AdminAddress />} />
          <Route path='seller' element={<Seller />} />
        </Route >

        <Route path='/register' element={<OpenRoutes><Register /></OpenRoutes>} />
        <Route path='/verifie-email/:slug' element={<OpenRoutes><VerifieEmail /></OpenRoutes>} />
        <Route path='/login' element={<OpenRoutes><Login /></OpenRoutes>} />
        <Route path='/forgot-password' element={<OpenRoutes><ForgotPassword /></OpenRoutes>} />
        <Route path='/change-password/:token' element={<OpenRoutes><ChangePassword /></OpenRoutes>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  )
}

export default App
