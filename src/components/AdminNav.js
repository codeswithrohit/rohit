import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaThLarge, FaChalkboardTeacher, FaUserGraduate, FaBookOpen, FaBars, FaTimes } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';

const AdminNav = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage menu visibility
  const router = useRouter();

  // Function to determine if the link is active
  const isActive = (path) => router.pathname === path;

  // Function to toggle menu visibility
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="">
      {/* Menu Toggle Button for Mobile and Small Screens */}
      <button
        className="fixed top-0 right-0 p-4 z-50 text-gray-700 lg:hidden"
        onClick={toggleMenu}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
      
      {/* Navigation Menu */}
      <div
        className={` lg:flex lg:h-screen absolute lg:w-72 lg:flex-col lg:overflow-hidden lg:rounded-r-2xl lg:bg-gray-800 lg:text-white   ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:bg-gray-800  md:w-64 sm:w-56`}   style={{ zIndex: 30 }}
      >
        <h1 className="mt-10 ml-10 text-xl text-white font-bold font-mono underline hidden lg:block">Admin Panel</h1>
        
        <ul className="mt-20 space-y-3 bg-gray-800">
          <li
            className={`relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 ${
              isActive('/Admin') ? 'bg-blue-800 text-white' : 'text-white bg-gray-800 hover:bg-slate-600'
            }`}
            onClick={() => router.push('/Admin')}
          >
            <FaThLarge className="h-6 w-6" />
            <span className="hidden md:block font-mono">Overview</span>
            {isActive('/Admin') && (
              <svg className="absolute -top-1/2 -right-1 h-32 w-8 text-gray-50" xmlns="http://www.w3.org/2000/svg" viewBox="399.349 57.696 100.163 402.081" width="1em" height="4em">
                <path fill="currentColor" d="M 499.289 57.696 C 499.289 171.989 399.349 196.304 399.349 257.333 C 399.349 322.485 499.512 354.485 499.512 458.767 C 499.512 483.155 499.289 57.696 499.289 57.696 Z" />
              </svg>
            )}
          </li>
          <li
            className={`relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 ${
              isActive('/Admin/Blogs') ? 'bg-blue-800 text-white' : 'text-white bg-gray-800 hover:bg-slate-600'
            }`}
            onClick={() => router.push('/Admin/Blogs')}
          >
            <FaBookOpen className="h-6 w-6" />
            <span className="hidden md:block font-mono">Blogs</span>
            {isActive('/Admin/Blogs') && (
              <svg className="absolute -top-1/2 -right-1 h-32 w-8 text-gray-50" xmlns="http://www.w3.org/2000/svg" viewBox="399.349 57.696 100.163 402.081" width="1em" height="4em">
                <path fill="currentColor" d="M 499.289 57.696 C 499.289 171.989 399.349 196.304 399.349 257.333 C 399.349 322.485 499.512 354.485 499.512 458.767 C 499.512 483.155 499.289 57.696 499.289 57.696 Z" />
              </svg>
            )}
          </li>
          <li
            className={`relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 ${
              isActive('/Admin/Courses') ? 'bg-blue-800 text-white' : 'text-white bg-gray-800 hover:bg-slate-600'
            }`}
            onClick={() => router.push('/Admin/Courses')}
          >
            <FaBookOpen className="h-6 w-6" />
            <span className="hidden md:block font-mono">Courses</span>
            {isActive('/Admin/Courses') && (
              <svg className="absolute -top-1/2 -right-1 h-32 w-8 text-gray-50" xmlns="http://www.w3.org/2000/svg" viewBox="399.349 57.696 100.163 402.081" width="1em" height="4em">
                <path fill="currentColor" d="M 499.289 57.696 C 499.289 171.989 399.349 196.304 399.349 257.333 C 399.349 322.485 499.512 354.485 499.512 458.767 C 499.512 483.155 499.289 57.696 499.289 57.696 Z" />
              </svg>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminNav;
