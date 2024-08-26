import React from 'react';
import { useRouter } from 'next/router';
import { FaThLarge, FaReact, FaCss3Alt, FaRegNewspaper, FaSignOutAlt } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';
import { firebase } from '../Firebase/config';

const StudentNav = () => {
  const router = useRouter();

  // Function to determine if the link is active
  const isActive = (path) => router.pathname === path;

  // Logout function
  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <div className="bg-gray-50">
        <div className="absolute left-0 flex h-screen w-72 flex-col overflow-hidden rounded-r-2xl bg-gray-700 text-white">
          <h1 className="mt-10 ml-10 text-3xl font-bold">Student Panel</h1>
          <ul className="mt-20 space-y-3 flex-grow">
            <li
              className={`relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 ${
                isActive('/Student') ? 'bg-slate-600 text-gray-50' : 'text-gray-300 hover:bg-slate-600'
              }`}
              onClick={() => router.push('/Student')}
            >
              <FaThLarge className="h-6 w-6" />
              <span>Overview</span>
              {isActive('/Student') && (
                <svg className="absolute -top-1/2 -right-1 h-32 w-8 text-gray-50" xmlns="http://www.w3.org/2000/svg" viewBox="399.349 57.696 100.163 402.081" width="1em" height="4em">
                  <path fill="currentColor" d="M 499.289 57.696 C 499.289 171.989 399.349 196.304 399.349 257.333 C 399.349 322.485 499.512 354.485 499.512 458.767 C 499.512 483.155 499.289 57.696 499.289 57.696 Z" />
                </svg>
              )}
            </li>
            <li
              className={`relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 ${
                isActive('/Student/reactnative') ? 'bg-slate-600 text-gray-50' : 'text-gray-300 hover:bg-slate-600'
              }`}
              onClick={() => router.push('/Student/reactnative')}
            >
              <FaReact className="h-6 w-6" />
              <span>React Native</span>
              {isActive('/Student/reactnative') && (
                <svg className="absolute -top-1/2 -right-1 h-32 w-8 text-gray-50" xmlns="http://www.w3.org/2000/svg" viewBox="399.349 57.696 100.163 402.081" width="1em" height="4em">
                  <path fill="currentColor" d="M 499.289 57.696 C 499.289 171.989 399.349 196.304 399.349 257.333 C 399.349 322.485 499.512 354.485 499.512 458.767 C 499.512 483.155 499.289 57.696 499.289 57.696 Z" />
                </svg>
              )}
            </li>
            <li
              className={`relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 ${
                isActive('/Student/tailwindcss') ? 'bg-slate-600 text-gray-50' : 'text-gray-300 hover:bg-slate-600'
              }`}
              onClick={() => router.push('/Student/tailwindcss')}
            >
              <FaCss3Alt className="h-6 w-6" />
              <span>Tailwind CSS</span>
              {isActive('/Student/tailwindcss') && (
                <svg className="absolute -top-1/2 -right-1 h-32 w-8 text-gray-50" xmlns="http://www.w3.org/2000/svg" viewBox="399.349 57.696 100.163 402.081" width="1em" height="4em">
                  <path fill="currentColor" d="M 499.289 57.696 C 499.289 171.989 399.349 196.304 399.349 257.333 C 399.349 322.485 499.512 354.485 499.512 458.767 C 499.512 483.155 499.289 57.696 499.289 57.696 Z" />
                </svg>
              )}
            </li>
            <li
              className={`relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 ${
                isActive('/Student/blogs') ? 'bg-slate-600 text-gray-50' : 'text-gray-300 hover:bg-slate-600'
              }`}
              onClick={() => router.push('/Student/blogs')}
            >
              <FaRegNewspaper className="text-2xl" />
              <span>Blogs</span>
              {isActive('/Student/blogs') && (
                <svg className="absolute -top-1/2 -right-1 h-32 w-8 text-gray-50" xmlns="http://www.w3.org/2000/svg" viewBox="399.349 57.696 100.163 402.081" width="1em" height="4em">
                  <path fill="currentColor" d="M 499.289 57.696 C 499.289 171.989 399.349 196.304 399.349 257.333 C 399.349 322.485 499.512 354.485 499.512 458.767 C 499.512 483.155 499.289 57.696 499.289 57.696 Z" />
                </svg>
              )}
            </li>
          </ul>
          {/* Logout Button */}
          <div className="mt-auto flex items-center justify-center p-6">
            <button
              className="flex items-center space-x-2 rounded-md bg-red-600 py-2 px-4 text-white hover:bg-red-700"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentNav;
