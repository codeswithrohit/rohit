import AdminNav from '@/components/AdminNav'
import React, { useState } from 'react'
import { FaPlus, FaTimes } from 'react-icons/fa'
import { firebase } from '@/Firebase/config'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ReactNative = () => {
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')
  const [code, setCode] = useState('')
  const [category, setCategory] = useState('')
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!title || !code || !category) {
      toast.error('Please fill in all fields.')
      return
    }

    setUploading(true)
    setSubmitting(true)

    // Save data to Firestore
    const db = firebase.firestore()
    db.collection('components').add({
      Cat: 'ReactNative',
      title,
      link,
      code,
      category,
    }).then(() => {
      toast.success('Data submitted successfully.')
      setSubmitting(false)
      setShowModal(false)
      setTitle('')
      setCode('')
      setCategory('')
    }).catch((error) => {
      toast.error('Submission failed.')
      setSubmitting(false)
    })
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      <AdminNav />
      <div className='md:ml-72 p-4'>
        {/* Container for button and content */}
        <div className='flex justify-end mb-4'>
          <button
            className='flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition'
            onClick={() => setShowModal(true)}
          >
            <FaPlus className='mr-2' />
            Create
          </button>
        </div>
        {/* Main content */}
       
      </div>

      {/* Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-8 rounded-lg w-full max-w-lg relative'>
            <h2 className='text-2xl font-bold mb-6'>Create New Component</h2>
            <button
              onClick={() => setShowModal(false)}
              className='absolute top-3 right-3 text-gray-500 hover:text-gray-700'
            >
              <FaTimes className='text-2xl' />
            </button>
            <form>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className='block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900'
                >
                  <option value=''>Select Category</option>
                  <option value='Navbar'>Navbar</option>
                  <option value='Footer'>Footer</option>
                  <option value='Form'>Form</option>
                  <option value='Login'>Login</option>
                  <option value='Signup'>Signup</option>
                  <option value='Button'>Button</option>
                  <option value='Cards'>Cards</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
                <input
                  type='text'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className='block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Link</label>
                <input
                  type='text'
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className='block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Code</label>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className='block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900'
                  rows='4'
                />
              </div>
              <div className='flex justify-end'>
                <button
                  type='button'
                  onClick={handleSubmit}
                  className={`px-4 py-2 rounded-md text-white ${uploading ? 'bg-blue-300' : submitting ? 'bg-blue-400' : 'bg-blue-600'} hover:${uploading ? 'bg-blue-400' : 'bg-blue-700'} transition`}
                  disabled={uploading || submitting}
                >
                  {uploading ? 'Uploading...' : submitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  )
}

export default ReactNative
