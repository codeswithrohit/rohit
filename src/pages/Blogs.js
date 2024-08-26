import React, { useState, useEffect } from "react";
import SEO from "../common/seo";
import BlogMasonry from "../components/blog-masonry";
import WrapperFour from "../layout/wrapper-4";
import 'tailwindcss/tailwind.css';
import { firebase } from '../Firebase/config';
import { toast } from 'react-toastify';

const index = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsSnapshot = await firebase.firestore().collection('blogs').get();
        const blogsData = blogsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBlogs(blogsData);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        toast.error('Error fetching blogs. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <WrapperFour>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="border-t-transparent border-solid animate-spin border-blue-800 border-8 rounded-full h-16 w-16"></div>
        </div>
      ) : (
        <BlogMasonry blogs={blogs} />
      )}
    </WrapperFour>
  );
};

export default index;
