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
import Store from './pages/Store'
import VerifieEmail from './pages/VerifieEmail'
import Wishlist from './pages/Wishlist'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='detail' element={<Detail />} />
          <Route path='store' element={<Store />} />
          <Route path='wishlist' element={<Wishlist />} />
          <Route path='cart' element={<Cart />} />
          <Route path='order' element={<Order />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/verifie-email' element={<VerifieEmail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/change-password' element={<ChangePassword />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
