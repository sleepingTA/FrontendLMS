
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

function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/courses" element={<CourseDetail />} />
        <Route path="/coursespage" element={<CoursePage />} />
        <Route path="/coursescategory" element={<CourseCategory />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<CheckOut />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
