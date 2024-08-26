import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router';
import { firebase } from '../Firebase/config';
import 'firebase/auth';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Modal from 'react-modal'; // Import Modal
import Link from 'next/link';
import { signInWithPhoneNumber } from "firebase/auth";
Modal.setAppElement('#__next'); // Set the root element for the modal

const Signinsinup = () => {
  const router = useRouter();





  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [name, setName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [step, setStep] = useState(1);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  function onSignup() {
    setLoading(true);

    const appVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          signIn();
        },
        "expired-callback": () => {},
      }
    );

    const formatPh = "+" + ph;

    signInWithPhoneNumber(firebase.auth(), formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function signIn() {
    const appVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container"
    );
    const formatPh = "+" + ph;

    signInWithPhoneNumber(firebase.auth(), formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        setLoading(false);
        toast.success("Phone number verified successfully!");
        console.log("User object:", res.user);
  
        const userRef = firebase.firestore().collection("users").doc(res.user.uid);
        await userRef.set({
          mobileNumber: ph,
          mobileVerification: true,
          Role:"Student"
        }, { merge: true });

        // Check if the user already has name and class in the database
        const userDoc = await userRef.get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          if (userData.name && userData.class) {
            // If name and class are found, redirect to /Student
            router.push('/Student');
          } else {
            // If name and class are not found, show Step 2
            setStep(2);
          }
        } else {
          // If the document doesn't exist, show Step 2
          setStep(2);
        }
      })
      .catch((err) => {
        console.error("Error verifying OTP:", err);
        setLoading(false);
        toast.error("Invalid verification code. Please try again.");
      });
  }
  
  function onSubmit() {
    setLoading(true);

    const userRef = firebase.firestore().collection("users").doc(user);
    userRef.update({
      name: name,
      class: selectedClass
    })
    .then(() => {
      setLoading(false);
      toast.success("Information updated successfully!");
      router.push('/Student');
    })
    .catch((error) => {
      console.error("Error updating user info:", error);
      setLoading(false);
      toast.error("Failed to update information. Please try again.");
    });
  }
  

  return (
      <div className=" bg-gray-800">
        <div className="flex justify-center items-center mb-4 lg:py-16">
          <img src="https://apesys.in/wp-content/uploads/2024/04/Untitled-design-4.png" alt="Logo" className="w-20 h-20" />
        </div>
        <div className="w-full lg:-mt-20 bg-[#e8f0fe] flex justify-center items-center">
          <div className="w-full max-w-md p-6 bg-gray-800 ">
            <p className="text-center text-sm font-bold text-white mb-6 font-serif">
              We'll check if you have an account, and help create one if you don't.
            </p>
            {step === 1 && (
            <div className="flex flex-col items-center justify-center space-y-2">
            <div id="recaptcha-container"></div>
            <div className="w-80 flex flex-col gap-2 rounded-lg p-2">
                        {showOTP ? (
                          <>
                            <p class="mb-1 font-medium text-center text-white font-mono">Enter OTP</p>
                            <div class="mb-1 flex flex-col">
                              <div class="focus-within:border-red-600 relativeflex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
                                <input
                                  type="text"
                                  value={otp}
                                  onChange={(e) => setOtp(e.target.value)}
                                  placeholder="Enter OTP"
                                  class="w-full border-gray-300 bg-white px-4 py-2 text-base text-black placeholder-gray-400 focus:outline-none"
                                />
                              </div>
                            </div>

                            <button
                              onClick={onOTPVerify}
                              className="bg-red-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                            >
                             {loading && (
  <div className="flex justify-center items-center">
    <svg className="animate-spin h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  </div>
)}

                              <span>Verify OTP</span>
                            </button>
                          </>
                        ) : (
                          <>
                            <PhoneInput
                              country={"in"}
                              value={ph}
                              onChange={setPh}
                            />
                            <button
                              onClick={onSignup}
                              className="bg-red-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                            >
                             {loading && (
  <div className="flex justify-center items-center ">
    <svg className="animate-spin h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  </div>
)}

                              <span>Send code via SMS</span>
                            </button>
                          </>
                        )}
                      </div>
            
         


            
            </div>
            )}
              {step === 2 && (
            <>
              <p className="mb-1 font-medium text-center text-white font-mono ">Enter Your Name</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full border-gray-300 rounded-lg bg-white px-4 py-2 text-base text-black placeholder-gray-400 focus:outline-none mb-4"
              />
              <div className="mb-4">
                <p className="mb-1 font-medium text-center text-white font-mono">Select Class</p>
                <div className="flex justify-around">
                  <button
                    onClick={() => setSelectedClass('Class 9')}
                    className={`p-3 rounded-full ${selectedClass === 'Class 9' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                  >
                    Class 9
                  </button>
                  <button
                    onClick={() => setSelectedClass('Class 10')}
                    className={`p-3 rounded-full ${selectedClass === 'Class 10' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                  >
                    Class 10
                  </button>
                </div>
              </div>
              <button
                onClick={onSubmit}
                className="bg-green-500 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                disabled={loading}
              >
                <span>Submit</span>
              </button>
            </>
          )}
          </div>
        </div>
        <ToastContainer/>
      </div>

     
      
  );
};

export default Signinsinup;
