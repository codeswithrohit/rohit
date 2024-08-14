import React, { useEffect, useState } from 'react';
import { firebase } from '../../Firebase/config';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

const TailwindCss = () => {
  const [data, setData] = useState([]); // State to hold the fetched data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors
  const [previewCode, setPreviewCode] = useState(''); // State to hold the code for preview

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Reference to your Firestore collection
        const db = firebase.firestore();
        const querySnapshot = await db.collection('components').get();

        // Check if the querySnapshot contains documents
        if (!querySnapshot.empty) {
          const fetchedData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          setData(fetchedData); // Set the fetched data to state
          console.log('Fetched data:', fetchedData);
        } else {
          console.log('No documents found.');
          setData([]); // Set empty data if no documents found
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error); // Set error if an error occurs
      } finally {
        setLoading(false); // Set loading to false after fetching is complete
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center text-gray-600">Loading...</div>; // Display loading state
  if (error) return <div className="text-center text-red-600">Error: {error.message}</div>; // Display error message

  const handlePreview = (code) => {
    // Set the preview code
    setPreviewCode(code);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-900">Tailwind CSS Components</h1>
      {data.length > 0 ? (
        data.map(item => (
          <div key={item.id} className="mb-8 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">{item.title}</h2>
            <p className="text-gray-500 mb-3">Category: {item.category}</p>
            <button
              className="px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out mr-2"
              onClick={() => handlePreview(item.code)}
            >
              Preview
            </button>

            <div className="mt-4">
              <h3 className="text-xl font-medium mb-2 text-gray-700">Code:</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto border border-gray-200">
                <code className="text-sm text-gray-900">{item.code}</code>
              </pre>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No data available.</p>
      )}
      {/* Preview Section */}
      {previewCode && (
        <div className="mt-8 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
          <h3 className="text-xl font-medium mb-4 text-gray-700">Preview:</h3>
          <div className="bg-gray-100 p-4 border border-gray-200 rounded-md overflow-hidden">
            <iframe
              title="Preview"
              srcDoc={`<!DOCTYPE html>
                <html>
                  <head>
                    <meta charset="UTF-8">
                    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet"> <!-- Tailwind CSS CDN -->
                  </head>
                  <body>
                    <style>
                      /* Add any additional styles if needed */
                    </style>
                    ${previewCode} <!-- Inject HTML with Tailwind CSS classes -->
                  </body>
                </html>`}
              style={{ width: '100%', height: '500px', border: 'none' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TailwindCss;
