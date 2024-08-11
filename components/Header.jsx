import React from 'react'

const Header = () => {
  return (
    <div>
      <header className='py-4 px-10 bg-[#303956]'>
        <nav className='flex justify-between items-center container'>
          <div className='left flex justify-between items-center gap-2'>
            <div className='logo w-[100px] flex justify-between items-center gap-2'>
            <span className='text-3xl font-bold text-white md:hidden  black bar'>
              <i className='fa-solid fa-bars'></i>
            </span>

              <img src='logo.png' alt='logo' className='w-[50%]'></img>
            </div>

            <div className='menu pl-[77px] md:block  hidden'>
              <ul className='flex justify-between gap-4'>
                <li><a href='#' className='text-white'>Home  </a></li>
                <li><a href='#'  className='text-white'>About  </a></li>
                <li><a href='#'  className='text-white'>Services  </a></li>
                <li><a href='#'  className='text-white'>Contact  </a></li>
                <li><a href='#'  className='text-white'>Contact  </a></li>
              </ul>
            </div>

          </div>

          <div className='right flex justify-between items-center gap-2'>

            <div className='lock'>
              <i class="fa-solid fa-lock text-white"></i>
            </div>

            <div className='signupBox'></div>
            <a href='#' className='signup py-1 px-2 border-[2px] text-white rounded-md'>Sign Up</a>

          </div>



        </nav>
      </header>

    </div>
  )
}

export default Header
