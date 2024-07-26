import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import NoPage from './pages/NoPage'
import Contact from './pages/Contact'
import Login from './pages/Login'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import Register from './pages/Register'
import ConfirmEmail from './pages/ConfirmEmail'



function App() {
  return (
    <>
    <Routes>
      <Route element={<ProtectedRoute />}>

      <Route path="/home" element={<Home />} />
      </Route>
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/confirmEmail/:token" element={<ConfirmEmail />} />

      <Route path="*" element={<NoPage />} />
    </Routes>
    </>
  )
}

export default App
