
import './index.css'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import Footer from './components/layout/Footer'
import CourseDetail from './pages/CourseDetail'
import CoursePage from './pages/CoursePage' 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WishList from './pages/WishList'
import Header from './components/layout/Header'
<<<<<<< Updated upstream
=======
import ShoppingCart from './pages/ShoppingCart'
import CheckOut from './pages/CheckOut'
import CourseCategory from './pages/CourseCategory'
import Profile from './pages/ProfilePage'
import Security from './pages/Security'
import Photo from './pages/Photo'
import ProfilePage from './pages/ProfilePage'

>>>>>>> Stashed changes
function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
<<<<<<< Updated upstream
        <Route path="/courses" element={<CoursePage />} />
=======
        <Route path="/courses" element={<CourseDetail />} />
        <Route path="/coursespage" element={<CoursePage />} />
        <Route path="/coursescategory" element={<CourseCategory />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<CheckOut />} />
>>>>>>> Stashed changes
      </Routes>
      <Footer />
    </>
  )
}

export default App
