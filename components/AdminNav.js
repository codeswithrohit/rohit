import React from 'react';
import { useRouter } from 'next/router';
import { FaThLarge, FaReact, FaCss3Alt, FaRegNewspaper } from 'react-icons/fa';

const AdminNav = () => {
  const router = useRouter();

  // Function to determine if the link is active
  const isActive = (path) => router.pathname === path;

  return (
    <div>
      <div className=" bg-gray-50">
        <div className="absolute left-0 flex h-screen w-72 flex-col overflow-hidden rounded-r-2xl bg-gray-700 text-white">
          <h1 className="mt-10 ml-10 text-3xl font-bold">Admin Panel</h1>
          <ul className="mt-20 space-y-3">
            <li
              className={`relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 ${
                isActive('/Admin') ? 'bg-slate-600 text-gray-50' : 'text-gray-300 hover:bg-slate-600'
              }`}
              onClick={() => router.push('/Admin')}
            >
              <FaThLarge className="h-6 w-6" />
              <span>Overview</span>
              {isActive('/Admin') && (
                <svg className="absolute -top-1/2 -right-1 h-32 w-8 text-gray-50" xmlns="http://www.w3.org/2000/svg" viewBox="399.349 57.696 100.163 402.081" width="1em" height="4em">
                  <path fill="currentColor" d="M 499.289 57.696 C 499.289 171.989 399.349 196.304 399.349 257.333 C 399.349 322.485 499.512 354.485 499.512 458.767 C 499.512 483.155 499.289 57.696 499.289 57.696 Z" />
                </svg>
              )}
            </li>
            <li
              className={`relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 ${
                isActive('/Admin/reactnative') ? 'bg-slate-600 text-gray-50' : 'text-gray-300 hover:bg-slate-600'
              }`}
              onClick={() => router.push('/Admin/reactnative')}
            >
              <FaReact className="h-6 w-6" />
              <span>React Native</span>
              {isActive('/Admin/reactnative') && (
                <svg className="absolute -top-1/2 -right-1 h-32 w-8 text-gray-50" xmlns="http://www.w3.org/2000/svg" viewBox="399.349 57.696 100.163 402.081" width="1em" height="4em">
                  <path fill="currentColor" d="M 499.289 57.696 C 499.289 171.989 399.349 196.304 399.349 257.333 C 399.349 322.485 499.512 354.485 499.512 458.767 C 499.512 483.155 499.289 57.696 499.289 57.696 Z" />
                </svg>
              )}
            </li>
            <li
              className={`relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 ${
                isActive('/Admin/tailwindcss') ? 'bg-slate-600 text-gray-50' : 'text-gray-300 hover:bg-slate-600'
              }`}
              onClick={() => router.push('/Admin/tailwindcss')}
            >
              <FaCss3Alt className="h-6 w-6" />
              <span>Tailwind CSS</span>
              {isActive('/Admin/tailwindcss') && (
                <svg className="absolute -top-1/2 -right-1 h-32 w-8 text-gray-50" xmlns="http://www.w3.org/2000/svg" viewBox="399.349 57.696 100.163 402.081" width="1em" height="4em">
                  <path fill="currentColor" d="M 499.289 57.696 C 499.289 171.989 399.349 196.304 399.349 257.333 C 399.349 322.485 499.512 354.485 499.512 458.767 C 499.512 483.155 499.289 57.696 499.289 57.696 Z" />
                </svg>
              )}
            </li>
            <li
              className={`relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 ${
                isActive('/Admin/blogs') ? 'bg-slate-600 text-gray-50' : 'text-gray-300 hover:bg-slate-600'
              }`}
              onClick={() => router.push('/Admin/blogs')}
            >
              <FaRegNewspaper className="text-2xl" />
              <span>Blogs</span>
              {isActive('/Admin/blogs') && (
                <svg className="absolute -top-1/2 -right-1 h-32 w-8 text-gray-50" xmlns="http://www.w3.org/2000/svg" viewBox="399.349 57.696 100.163 402.081" width="1em" height="4em">
                  <path fill="currentColor" d="M 499.289 57.696 C 499.289 171.989 399.349 196.304 399.349 257.333 C 399.349 322.485 499.512 354.485 499.512 458.767 C 499.512 483.155 499.289 57.696 499.289 57.696 Z" />
                </svg>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminNav;
