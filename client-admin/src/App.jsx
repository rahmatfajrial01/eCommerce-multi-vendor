import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Category from './pages/Category'
import Dashboard from './pages/Dashboard'
import User from './pages/User'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />} >
          <Route index element={<Dashboard />} />
          <Route path='/user' element={<User />} />
          <Route path='/category' element={<Category />} />
        </Route >
      </Routes>
    </BrowserRouter>
  )
}

export default App
