import React from 'react'

const Test = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
   

<div class="h-96 flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
  <div class="relative">
    <div class="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg animate-pulse"></div>
    <div id="form-container" class="bg-white p-16 rounded-lg shadow-2xl w-80 relative z-10 transform transition duration-500 ease-in-out">
      <h2 id="form-title" class="text-center text-3xl font-bold mb-10 text-gray-800">Login</h2>
      <form class="space-y-5">
        <input class="w-full h-12 border border-gray-800 px-3 rounded-lg" placeholder="Email" id="" name="" type="text"/>
        <input class="w-full h-12 border border-gray-800 px-3 rounded-lg" placeholder="Password" id="" name="" type="password"/>
        <button class="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign in</button>
        <a class="text-blue-500 hover:text-blue-800 text-sm" href="#">Forgot Password?</a>
      </form>
    </div>
  </div>
</div>



    </div>
  )
}

export default Test
