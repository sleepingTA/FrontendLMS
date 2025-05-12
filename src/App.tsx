
import './index.css'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import Footer from './components/layout/Footer'
import CoursePage from './pages/CoursePage' 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WishList from './pages/WishList'
import Header from './components/layout/Header'
function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursePage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
