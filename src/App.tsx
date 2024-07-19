import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import NoPage from './pages/NoPage'
import Contact from './pages/Contact'



function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
    </>
  )
}

export default App
