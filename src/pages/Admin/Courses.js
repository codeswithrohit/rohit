import AdminNav from '../../components/AdminNav';
import React, { useEffect, useState } from 'react';
import { firebase } from '../../Firebase/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus, FaTrash, FaTimes } from 'react-icons/fa';

const ITEMS_PER_PAGE = 10; // Number of items per page

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCourseName, setSearchCourseName] = useState('');
  const [searchClassName, setSearchClassName] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const snapshot = await firebase.firestore().collection('courses').get();
        const courseData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCourses(courseData);
        setFilteredCourses(courseData);
      } catch (error) {
        toast.error('Error fetching courses: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const filtered = courses.filter(course =>
      course.courseName.toLowerCase().includes(searchCourseName.toLowerCase()) &&
      course.className.toLowerCase().includes(searchClassName.toLowerCase())
    );
    setFilteredCourses(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchCourseName, searchClassName, courses]);

  const handleAddCourseClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSearchChange = (e) => {
    const { id, value } = e.target;
    if (id === 'course-name-search') {
      setSearchCourseName(value);
    } else if (id === 'class-name-search') {
      setSearchClassName(value);
    }
  };

  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [activeTab, setActiveTab] = useState({});
  const [thumbnail, setThumbnail] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // For tracking progress
  const [isSubmitting, setIsSubmitting] = useState(false); // For tracking submission status



 


  const handleFileUpload = async (file, path) => {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(path);
    const uploadTask = fileRef.put(file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress); // Update progress
        },
        (error) => {
          reject(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting status

    try {
      const courseData = {
        // Collect data from form fields
        className: e.target.className.value,
        courseName: e.target.courseName.value,
        price: e.target.price.value,
        offerPrice: e.target.offerPrice.value,
        totalClasses: e.target.totalClasses.value,
        totalDuration: e.target.totalDuration.value,
        totalStudents: e.target.totalStudents.value,
        aboutCourse: e.target.aboutCourse.value,
       
       
        thumbnail: thumbnail ? await handleFileUpload(thumbnail, `courses/${e.target.courseName.value}/thumbnail`) : '',
      };

      // Save data to Firestore
      await firebase.firestore().collection('courses').add(courseData);
      toast.success('Course added successfully!');
      resetForm();
    } catch (error) {
      toast.error('Error adding course: ' + error.message);
    } finally {
      setIsSubmitting(false); // Reset submitting status
      setUploadProgress(0); // Reset progress after submission
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await firebase.firestore().collection('courses').doc(id).delete();
      toast.success('Course deleted successfully');
      // Update local state to remove the deleted course
      setCourses(courses.filter(course => course.id !== id));
      setFilteredCourses(filteredCourses.filter(course => course.id !== id));
    } catch (error) {
      toast.error('Error deleting course: ' + error.message);
    }
  };


  return (
    <div className='min-h-screen bg-white'>
      <AdminNav />
      <div className='md:ml-72 flex flex-col p-2'>
        <h1 className='text-2xl font-bold text-black mb-4 font-mono'>Courses</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
           
              <section className="bg-white dark:bg-white p-3 sm:p-5">
                <div className="w-full lg:px-12">
                  <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                      <div className="w-full md:w-1/2">
                        <form className="flex items-center">
                          <label htmlFor="course-name-search" className="sr-only">Search by Course Name</label>
                          <div className="relative w-full">
                            <input
                              type="text"
                              id="course-name-search"
                              value={searchCourseName}
                              onChange={handleSearchChange}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Search by Course Name"
                            />
                          </div>
                        </form>
                      </div>
                      <div className="w-full md:w-1/2">
                        <form className="flex items-center">
                          <label htmlFor="class-name-search" className="sr-only">Search by Class Name</label>
                          <div className="relative w-full">
                            <input
                              type="text"
                              id="class-name-search"
                              value={searchClassName}
                              onChange={handleSearchChange}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Search by Class Name"
                            />
                          </div>
                        </form>
                      </div>
                      <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                        <button
                          type="button"
                          onClick={handleAddCourseClick}
                          className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                          </svg>
                          Add Courses
                        </button>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-4 py-3 font-mono">Course name</th>
                            <th scope="col" className="px-4 py-3 font-mono">Class</th>
                            <th scope="col" className="px-4 py-3 font-mono">Price</th>
                            <th scope="col" className="px-4 py-3 font-mono">Actions</th>
                          </tr>
                        </thead>
                        {filteredCourses.length === 0 ? (
              <p className='text-center font-mono font-bold' >No courses available</p>
            ) : (
                        <tbody>
                          {paginatedCourses.map((course, index) => (
                            <tr key={course.id} className="border-b dark:border-gray-700">
                              <th scope="row" className="px-4 py-3 font-mono font-medium text-gray-900 whitespace-nowrap dark:text-white">{startIndex + index + 1}.{course.courseName}</th>
                              <td className="px-4 py-3 font-mono">{course.className}</td>
                              <td className="px-4 py-3 font-mono">{course.offerPrice}</td>
                              <td className="px-4 py-3 font-mono flex items-center">
                                <li>
                                  <a href="#" className="block py-2 px-4 font-mono hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">View</a>
                                </li>
                                <li>
                                  <a href="#" className="block py-2 px-4 font-mono hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                </li>
                                <li>
                                <button
                                    onClick={() => handleDeleteCourse(course.id)}
                                    className="block py-2 px-4 font-mono text-red-600 hover:bg-red-100 hover:font-bold dark:hover:bg-red-600 dark:hover:text-white"
                                  >
                                    <FaTrash className="inline mr-2" />
                                    Delete
                                  </button>
                                </li>
                              </td>
                            </tr>
                          ))}
                        </tbody>
            )}
                      </table>
                    </div>
                    <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        Showing <span className="font-semibold text-gray-900 dark:text-white">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{Math.min(currentPage * ITEMS_PER_PAGE, filteredCourses.length)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{filteredCourses.length}</span> entries
                      </span>
                      <ul className="inline-flex items-center -space-x-px">
                        <li>
                          <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-l-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            <span className="sr-only">Previous</span>
                            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                              <path fillRule="evenodd" d="M12.707 4.293a1 1 0 00-1.414 0L7 8.586 3.707 5.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 000-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </li>
                        {[...Array(totalPages).keys()].map(page => (
                          <li key={page + 1}>
                            <button
                              onClick={() => setCurrentPage(page + 1)}
                              className={`inline-flex items-center px-3 py-2 text-sm font-medium ${currentPage === page + 1 ? 'text-blue-600 bg-blue-100 border border-blue-300 dark:border-blue-600 dark:bg-blue-600 dark:text-white' : 'text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600'} rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`}
                            >
                              {page + 1}
                            </button>
                          </li>
                        ))}
                        <li>
                          <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-r-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            <span className="sr-only">Next</span>
                            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                              <path fillRule="evenodd" d="M7.293 15.707a1 1 0 001.414 0L13 12.414l3.293 3.293a1 1 0 001.414-1.414l-4-4a1 1 0 00-1.414 0l-4 4a1 1 0 000 1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </section>
            {isPopupOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="relative w-full p-4 bg-white shadow-lg rounded-lg max-h-screen overflow-y-auto">
                  <button
                    onClick={handleClosePopup}
                    className="absolute top-2 right-2 text-2xl text-red-500 hover:text-red-700"
                  >
                    <FaTimes />
                  </button>
                  <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <div className="grid grid-cols-1 gap-8">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 font-mono">Class Name</label>
            <select name="className" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5">
              <option value="">Select Class</option>
              <option value="class9">Class 9</option>
              <option value="class10">Class 10</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 font-mono">Course Name</label>
            <input name="courseName" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 font-mono">Price</label>
            <input name="price" type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 font-mono">Offer Price</label>
            <input name="offerPrice" type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 font-mono">Total Classes</label>
            <input name="totalClasses" type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 font-mono">Total Duration (Hours)</label>
            <input name="totalDuration" type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 font-mono">Total Students</label>
            <input name="totalStudents" type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 font-mono">About Course</label>
            <textarea name="aboutCourse" rows="4" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 font-mono">Thumbnail Image</label>
            <input type="file" onChange={(e) => setThumbnail(e.target.files[0])} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" />
          </div>

        

    

       

          <button
            type="submit"
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-lg ${isSubmitting ? 'bg-blue-300' : ''}`}
            disabled={isSubmitting} // Disable the button when submitting
          >
            {isSubmitting ? 'Submitting' : 'Submit'} {isSubmitting && uploadProgress > 0 && `(${Math.round(uploadProgress)}% Uploading)`}
          </button>
          </div>
        </form>
                </div>
              </div>
            )}
            <ToastContainer />
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
