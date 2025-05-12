import React from 'react'
import Hero from '../components/ui/Hero'
import Companies from '../components/ui/Companies'
import CoursesSection from '../components/ui/CoursesSection'
import CallToAction from '../components/ui/CallToAction'


const Home = () => {
  return (
    <>
       <div className='flex flex-col items-center space-y-7 text-center'>
          <Hero />
          <Companies />
          <CoursesSection />     
          <CallToAction />    
        </div>
    </>
  )
}

export default Home
