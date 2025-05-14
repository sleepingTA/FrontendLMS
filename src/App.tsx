
import './index.css'
import Home from './pages/Home'
import Footer from './components/layout/Footer'
import CourseDetail from './pages/CourseDetail'
import CoursePage from './pages/CoursePage' 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import ShoppingCart from './pages/ShoppingCart'
import CheckOut from './pages/CheckoutPage'
import CourseCategory from './pages/CourseCategory'
import ProfilePage from './pages/ProfilePage'
import CoursePaid from './pages/CoursePaid'
import CourseProgress from './pages/CourseProgress'

function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CourseCategory />} />
        <Route path="/unpaid" element={<CourseDetail />} />
        <Route path="/mycourses" element={<CoursePage />} />
        <Route path="/player" element={<CourseProgress />} />
        <Route path="/coursescategory" element={<CourseCategory />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/paid" element={<CoursePaid />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
