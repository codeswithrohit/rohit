import React, { useState } from 'react';
import { toast,ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';
import { firebase } from '../Firebase/config';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';


const storage = firebase.storage();
const firestore = firebase.firestore();

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    mobile: '',
    email: '',
    address: '',
    workExperience: '',
    academicQualification: '',
    professionalQualification: '',
    password: '',
    confirmPassword: '',
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguages((prev) =>
      prev.includes(language) ? prev.filter((l) => l !== language) : [...prev, language]
    );
  };

  const handleCourseSelect = (course) => {
    setSelectedCourses((prev) =>
      prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!Object.values(formData).every(field => field.trim()) || !file) {
      toast.error('All fields are required!');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    setUploading(true);
    try {
      const fileRef = storage.ref().child(`images/${file.name}`);
      await fileRef.put(file);

      const fileUrl = await fileRef.getDownloadURL();

      await firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password);

      await firestore.collection('Teacher').add({
        ...formData,
        photoURL: fileUrl,
        languages: selectedLanguages,
        courses: selectedCourses,
        Verification:"Pending",
        Role:"Teacher"
      });

      toast.success('Registration successful!');
      router.push('/signin');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };
  return (
    <div>
    <section class=" relative py-8">
    <form onSubmit={handleSubmit} className="space-y-6">
        <div class="w-full  px-4 md:px-5 lg:px-5 mx-auto">
            <div class="w-full flex-col justify-start items-start lg:gap-7 md:gap-5 gap-4 inline-flex">
              
                <div class="w-full flex-col justify-start items-start gap-6 flex">
                    <h4 class="text-gray-900 text-xl font-semibold leading-loose">Personal Details</h4>
                    <div class="w-full flex-col justify-start items-start gap-8 flex">
                    <div class="max-w-sm">
    <label for="photobutton" class="text-xs font-medium text-gray-500">Your Photo</label>
    <div class="relative z-0 mt-0.5 flex w-full -space-x-px">
        <input   type="file"
              name="photo"
              onChange={handleFileChange} class="block w-full cursor-pointer appearance-none rounded-l-md border border-gray-200 bg-white px-3 py-2 text-sm transition focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"/>
    </div>
</div>
                        <div class="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                            <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                <label for="" class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"> Name
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                                        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                                    </svg>
                                </label>
                                <input type="text"    name="name"
            value={formData.name}
            onChange={handleChange} class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex" placeholder="Enter Your Name" />
                            </div>
                            <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                <label for="" class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">Father's Name
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                                        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                                    </svg>
                                </label>
                                <input type="text" name="fatherName"
            value={formData.fatherName}
            onChange={handleChange} class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex" placeholder="Enter Your Father Name" />
                            </div>
                        </div>
                        <div class="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                            <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                <label for="" class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">Mobile Number
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                                        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                                    </svg>
                                </label>
                                <input type="text"  name="mobile"
            value={formData.mobile}
            onChange={handleChange} class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex" placeholder="028 2154-2541" />
                            </div>
                            <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                <label for="" class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">Email
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                                        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                                    </svg>
                                </label>
                                <input type="email"  name="email"
            value={formData.email}
            onChange={handleChange} class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex" placeholder="Johnsmith@gmail.com" />
                            </div>
                        </div>
                        <div class="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                            <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                <label for="" class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">Address
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                                        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                                    </svg>
                                </label>
                                <input type="text" name="address"
            value={formData.address}
            onChange={handleChange} class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex" placeholder="396 Matilda Falls, New Theresiaboro 14897-2774" />
                            </div>
                            <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                <label for="" class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">Work Experience
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                                        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                                    </svg>
                                </label>
                                <input type="text" name="workExperience"
            value={formData.workExperience}
            onChange={handleChange} class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex" placeholder="5 Year" />
                            </div>
                        </div>
                        <div class="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                        <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                <label for="" class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"> Academic Qualification 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                                        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                                    </svg>
                                </label>
                                <input type="text"  name="academicQualification"
            value={formData.academicQualification}
            onChange={handleChange} class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex" placeholder="Enter Your Academic" />
                            </div>
                            <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                <label for="" class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"> Professional Qualification (if any)
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                                        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                                    </svg>
                                </label>
                                <input type="text"   name="professionalQualification"
            value={formData.professionalQualification}
            onChange={handleChange} class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex" placeholder="Enter Your Qualification" />
                            </div>
                          
                        </div>

                        <div class="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                        <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                <label for="" class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"> Password
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                                        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                                    </svg>
                                </label>
                                <input  type="password"
            name="password"
            value={formData.password}
            onChange={handleChange} class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex" placeholder="Password" />
                            </div>
                            <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                <label for="" class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">Confirm Password
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                                        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                                    </svg>
                                </label>
                                <input   type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange} class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex" placeholder="Confirm Password" />
                            </div>
                          
                        </div>
                    </div>
                </div>
                <div className="w-full flex-col justify-start items-start gap-6 flex">
          <h4 className="text-gray-900 text-xl font-semibold leading-loose">Language of Teaching</h4>
          <div className="justify-start items-start gap-7 flex flex-wrap">
            {['English', 'Hindi', 'English and Hindi both'].map((language) => (
              <button
                type="button"
                key={language}
                onClick={() => handleLanguageSelect(language)}
                className={`sm:w-fit w-full px-5 py-2.5 transition-all duration-700 ease-in-out rounded-full shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] flex justify-center items-center ${selectedLanguages.includes(language) ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white'}`}
              >
                <span className="px-2 py-px text-base font-semibold leading-relaxed">{language}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="w-full flex-col justify-start items-start gap-6 flex">
          <h4 className="text-gray-900 text-xl font-semibold leading-loose">Courses Applied For Teaching</h4>
          <div className="w-full flex-col justify-start items-start gap-6 flex">
            <h4 className="text-gray-500 text-xl font-semibold leading-loose">Class 09th & 10th CBSE</h4>
            <div className="justify-start items-start gap-7 flex flex-wrap">
              {['Science', 'Maths', 'English', 'Social Science'].map((course) => (
                <button
                  type="button"
                  key={course}
                  onClick={() => handleCourseSelect(course)}
                  className={`sm:w-fit w-full px-5 py-2.5 transition-all duration-700 ease-in-out rounded-full shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] flex justify-center items-center ${selectedCourses.includes(course) ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white'}`}
                >
                  <span className="px-2 py-px text-base font-semibold leading-relaxed">{course}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
               
        <button
          type="submit"
          disabled={uploading}
          className={`w-full px-5 py-3 bg-indigo-600 text-white rounded-lg ${uploading ? 'bg-opacity-70' : 'hover:bg-indigo-700'}`}
        >
          {uploading ? 'Uploading...' : 'Submit'}
        </button>
            </div>
        </div>
        </form>
    </section>

</div>
  )
}

export default Register