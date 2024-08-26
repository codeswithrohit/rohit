import Link from "next/link";
import React, { useState } from "react";
import SignIn from '../components/Signin';
// suitable_data
const suitable_data = [
  {
    id: 1,
    title: (
      <>
        Do you want to <span>Learn</span> here?
      </>
    ),
    des: <>Dramatically supply transpa deliverables before & you.</>,
    img: "/assets/img/bg/suit-bg-01.png",
  },
  {
    id: 2,
    title: (
      <>
        Do you want to <span>Teach</span> here?
      </>
    ),
    des: <>Dramatically supply transpa deliverables before & you.</>,
    img: "/assets/img/bg/suit-bg-02.png",
    link: '/signin'
  },
];

const SuitableArea = ({ style_2 }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <section
        className={`suitable-area  ${
          style_2 ? "bg-bottom grey-bg pt-15" : ""
        } pb-10 wow fadeInUp`}
        data-wow-duration="1s"
        data-wow-delay=".4s"
        style={{
          backgroundImage: style_2
            ? `url(/assets/img/bg/shape-bg-1.png)`
            : null,
        }}
      >
        <div className="container">
          <div className="row text-center">
            <div className="col-lg-12">
              <div className="section-title mb-10">
                <span className="tp-sub-title mb-15">Join With Us</span>
                <h2 className="tp-section-title">
                  Which One is Suitable For You?
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            {suitable_data.map((item) => (
              <div key={item.id} className="col-xl-6">
                <div
                  className={`tp-suit mb-10 p-relative ${
                    style_2 ? "white-bg" : ""
                  }`}
                >
                  <div className="tp-suit__content">
                    <h4 className="tp-suit__title">{item.title}</h4>
                    <p>{item.des}</p>
                    <div className="tp-suit__btn pt-5">
                      {item.id === 1 ? (
                        <button
                          onClick={() => setSidebarOpen(true)}
                          className="tp-border-btn"
                        >
                          Join Now
                        </button>
                      ) : (
                        <Link href={item.link} className="tp-border-btn">
                          Join Now
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="tp-suit__tech">
                    <img src={item.img} alt="suitable-img" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className={`fixed top-0 right-0 z-50 w-30 h-full bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} border-l-4 border-indigo-600`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-lg font-bold">Sign In</h2>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="text-red-500 text-4xl hover:text-red-800 font-bold"
                    >
                        X
                    </button>
                </div>
                <div className="">
                <SignIn/>
                </div>
            </div>
    </>
  );
};

export default SuitableArea;
