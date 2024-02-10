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
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { OpenRoutes } from './routing/openRoutes'
import { PrivateRoutes } from './routing/privateRoutes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='detail' element={<Detail />} />
          <Route path='store' element={<Store />} />
          <Route path='wishlist' element={<PrivateRoutes><Wishlist /></PrivateRoutes>} />
          <Route path='cart' element={<PrivateRoutes><Cart /></PrivateRoutes>} />
          <Route path='order' element={<PrivateRoutes><Order /></PrivateRoutes>} />
        </Route>
        <Route path='/register' element={<OpenRoutes><Register /></OpenRoutes>} />
        <Route path='/verifie-email/:slug' element={<OpenRoutes><VerifieEmail /></OpenRoutes>} />
        <Route path='/login' element={<OpenRoutes><Login /></OpenRoutes>} />
        <Route path='/forgot-password' element={<OpenRoutes><ForgotPassword /></OpenRoutes>} />
        <Route path='/change-password' element={<OpenRoutes><ChangePassword /></OpenRoutes>} />
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
