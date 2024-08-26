import AdminNav from '../../components/AdminNav';
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { firebase } from '../../Firebase/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Blogs = () => {
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState(null);
  const [image, setImage] = useState(null); // State for image
  const [category, setCategory] = useState('');
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submission status



  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let imageURL = '';

     

      if (image) {
        const imageRef = firebase.storage().ref(`images/${image.name}`);
        const imageUploadTask = imageRef.put(image);

        await new Promise((resolve, reject) => {
          imageUploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress(progress);
            },
            (error) => reject(error),
            async () => {
              imageURL = await imageUploadTask.snapshot.ref.getDownloadURL();
              resolve();
            }
          );
        });
      }

      const blogData = {
        heading,
        description,
        category,
        link,
        imageURL, // Include image URL
        date: new Date().toISOString(),
      };

      await firebase.firestore().collection('blogs').add(blogData);

      toast.success('Blog submitted successfully!');
      setHeading('');
      setDescription('');
      setLink('');
      setVideo(null);
      setImage(null);
      setCategory('');
      setProgress(0);
    } catch (error) {
      console.error('Error submitting blog:', error);
      toast.error('Error submitting blog. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-white'>
      <AdminNav />
      <div className='md:ml-72 flex'>
        <div className="w-full">
          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create a New Blog</h2>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Blog Heading</label>
              <input
                type="text"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter blog heading"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter blog category"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
              <div
                contentEditable
                dangerouslySetInnerHTML={{ __html: description }}
                onInput={(e) => setDescription(e.currentTarget.innerHTML)}
                className="shadow appearance-none border rounded h-32 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter blog description"
                style={{
                  whiteSpace: "pre-wrap",
                  overflowY: "auto",
                }}
              />
            </div>

            

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">You Tube Link</label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="YouTube Video Link like code last:22bLNq6iCjU"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Attach Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Upload Progress {Math.round(progress)}%</label>
              <progress value={progress} max="100" className="w-full"></progress>
            </div> */}

            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isSubmitting ? `Submitting... (${Math.round(progress)}%)` : 'Submit'}
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
