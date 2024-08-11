import React from 'react'
const Footer = () => {
  return (
    <>
    <div className='flex justify-center items-center py-[100px] mt-10 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)]'>
    <div className=' container sm:max-w-[1200px]    px-10 '>

  <div className='footer-logo w-[50px]'>
    <img src='logo.png' alt='logo' />
  </div>
  <p className='text-[#4c546c] py-3 text-sm'>Luma is a beautifully crafted user interface for modern Education Platforms, including Courses & Tutorials, Video Lessons, Student and Teacher Dashboard, Curriculum Management, Earnings and Reporting, ERP, HR, CMS, Tasks, Projects, eCommerce and more.</p>

  <p className='text-[#4c546c] py-3 text-sm'>
    <a href='#' className='underline'> Terms</a>
   <a href='#' className='underline'> Privacy Policy</a>
  </p>
  <p>Copyright 2024 © All rights reserved.</p>
    </div>
    </div>
      
    </>
  )
}

export default Footer
