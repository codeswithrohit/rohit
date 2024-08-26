import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import SignIn from '../components/Signin';
import Quotation from './Quotation';

export default () => {
    const [state, setState] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownState, setDropdownState] = useState({ isActive: false, idx: null });

    const navigation = [
        { title: "Home", path: "/", isDrapdown: false },
        { title: "Courses", path: "#", isDrapdown: false },
        { title: "Our Services", path: "#", isDrapdown: false },
        { title: "About Us", path: "#", isDrapdown: false },
        { title: "Contact Us", path: "#", isDrapdown: false },
    ];

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target;
            if (!target.closest(".nav-menu")) setDropdownState({ isActive: false, idx: null });
        };
    }, []);

    return (
        <>
            <nav className={`relative z-30 bg-white w-full md:static md:text-sm md:border-none ${state ? "shadow-lg rounded-b-xl md:shadow-none" : ""}`}>
                <div className="items-center gap-x-14 px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <a href="#">
                            <img
                                src="logo.png"
                                className='object-contain w-20 h-16'
                                alt="Tech Babua"
                            />
                        </a>
                        <div className="md:hidden">
                            <button className="text-gray-500 hover:text-gray-800"
                                onClick={() => setState(!state)}
                            >
                                {
                                    state ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                                        </svg>
                                    )
                                }
                            </button>
                        </div>
                    </div>
                    <div className={`nav-menu flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                        <ul className="items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                            {navigation.map((item, idx) => (
                                <li key={idx}>
                                    {item.isDrapdown ? (
                                        <button className="w-full font-mono font-bold flex items-center justify-between gap-1 text-gray-700 hover:text-indigo-600"
                                            onClick={() => setDropdownState({ idx, isActive: !dropdownState.isActive })}
                                        >
                                            {item.title}
                                            {dropdownState.idx === idx && dropdownState.isActive ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                    <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clipRule="evenodd" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </button>
                                    ) : (
                                        <a href={item.path} className="block font-bold font-mono text-gray-700 hover:text-indigo-600">
                                            {item.title}
                                        </a>
                                    )}
                                </li>
                            ))}
                            <div className='flex-1 items-center justify-end gap-x-6 space-y-3 md:flex md:space-y-0'>
                                <li>
                                    <button
                                        onClick={() => setSidebarOpen(true)}
                                        className="block py-3 px-4 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow md:inline"
                                    >
                                        Contact Us
                                    </button>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>

            {state && (
                <div
                    className="z-10 fixed top-0 w-screen h-screen bg-black/20 backdrop-blur-sm md:hidden"
                    onClick={() => setState(false)}
                ></div>
            )}

            <div className={`fixed top-0 right-0 z-50 w-30 h-full bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} border-l-4 border-indigo-600`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-lg font-bold">Contact Us</h2>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="text-red-500 text-4xl hover:text-red-800 font-bold"
                    >
                        X
                    </button>
                </div>
                <div className="">
             <Quotation/>
                </div>
            </div>
        </>
    );
};
