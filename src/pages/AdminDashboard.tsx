import React, { useState } from 'react'
import AdminSidebar from '../components/admin/AdminUI/AdminSidebar';
import AdUsers from '../components/admin/AdminUI/AdUsers';
import AdCourses from '../components/admin/AdminUI/AdCourses';
import AdCate from '../components/admin/AdminUI/AdCate';
import AdPay from '../components/admin/AdminUI/AdPay';
import AdStats from '../components/admin/AdminUI/AdStats';

export default function AdminDashboard() {
  const [toggleState, setToggleState] = useState(1);
  return (
    <div className=' flex'>
      <AdminSidebar toggleState={toggleState} setToggleState={setToggleState}/>
      <div className='flex-1'>
        {toggleState === 1 && <AdCate />}
        {toggleState === 2 && <AdUsers />}
        {toggleState === 3 && <AdCourses />}
        {toggleState === 4 && <AdPay />}
        {toggleState === 5 && <AdStats />}
      </div>
    </div>
  )
}
