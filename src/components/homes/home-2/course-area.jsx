import { useState } from "react";
import Link from "next/link";

const OurCourse = ({ courses }) => {
  const [activeTab, setActiveTab] = useState("All");

  const handleTabClick = (className) => {
    setActiveTab(className);
  };

  const filteredCourses = activeTab === "All" 
    ? courses 
    : courses.filter(course => course.className === activeTab);

  console.log("courses", courses);

  return (
    <>
      <section
        className="course-area pt-15 pb-10 wow fadeInUp"
        data-wow-duration=".8s"
        data-wow-delay=".3s"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title text-center mb-15">
                <span className="tp-bline-stitle mb-15">Our Courses</span>
                <h2 className="tp-section-title mb-10">
                  Explore Popular Courses
                </h2>
              </div>
            </div>
          </div>
          {/* course-nav-tab-start */}
          <div className="tp-course-nav-tabs">
            <nav>
              <div
                className="nav d-flex justify-content-center mb-50"
                id="nav-tab"
                role="tablist"
              >
                <button
                  className={`tp-course-tab ${activeTab === "All" ? "active" : ""}`}
                  onClick={() => handleTabClick("All")}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "All"}
                >
                  All
                </button>
                {courses.map((course, index) => (
                  <button
                    key={index}
                    style={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                    className={`tp-course-tab ${activeTab === course.className ? "active" : ""}`}
                    onClick={() => handleTabClick(course.className)}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === course.className}
                  >
                    {course.className}
                  </button>
                ))}
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                role="tabpanel"
              >
                <div className="row">
                  {filteredCourses.map((item, i) => (
                    <div key={i} className="col-xl-4 col-lg-6 col-md-6">
                      <div className="tpcourse mb-10">
                        <div className="tpcourse__thumb p-relative w-img fix">
                          <Link href={`/course-details?id=${item.id}`}>
                            <img src={item.thumbnail} alt={item.className} />
                          </Link>
                          <div className="tpcourse__tag">
                            <Link  href={`/course-details?id=${item.id}`} >
                              <i className="fi fi-rr-heart"></i>
                            </Link>
                          </div>
                        </div>
                        <div className="tpcourse__content-2">
                          <div className="tpcourse__category mb-10">
                            <ul className="tpcourse__price-list d-flex align-items-center">
                              <li>
                                <Link style={{fontSize:12}} href={`/course-details?id=${item.id}`}>
                                  MATHS
                                </Link>
                              </li>
                              <li>
                                <Link style={{fontSize:12}}  href={`/course-details?id=${item.id}`}>
                                  SCIENCE
                                </Link>
                              </li>
                              <li>
                                <Link style={{fontSize:12}}  href={`/course-details?id=${item.id}`}>
                                 SST
                                </Link>
                              </li>
                              <li>
                                <Link style={{fontSize:12}}  href={`/course-details?id=${item.id}`}>
                                  ENGLISH
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div className="tpcourse__ava-title mb-15">
                            <h4 className="tpcourse__title tp-cours-title-color">
                              <Link href={`/course-details?id=${item.id}`}>{item.courseName}</Link>
                            </h4>
                          </div>
                          <div className="tpcourse__meta tpcourse__meta-gap pb-15 mb-15">
                            <ul className="d-flex align-items-center">
                              <li>
                                <img
                                  src="/assets/img/icon/c-meta-01.png"
                                  alt="meta-icon"
                                />
                                <span>{item.totalClasses} Classes</span>
                              </li>
                              <li>
                                <img
                                  src="/assets/img/icon/c-meta-02.png"
                                  alt="meta-icon"
                                />
                                <span>{item.totalStudents} Students</span>
                              </li>
                            </ul>
                          </div>
                          <div className="tpcourse__rating d-flex align-items-center justify-content-between">
                            <div className="tpcourse__rating-icon">
                              {/* <span>{item.offerPrice}</span> */}
                              <i className="fi fi-ss-star"></i>
                              <i className="fi fi-ss-star"></i>
                              <i className="fi fi-ss-star"></i>
                              <i className="fi fi-ss-star"></i>
                              <i className="fi fi-rs-star"></i>
                              <p>(125)</p>
                            </div>
                            <div className="tpcourse__pricing">
                              <h5 className="price-title">
                              ₹{item.offerPrice}
                              </h5>
                              <h5 style={{ textDecoration: 'line-through',color:'red' }} className="price-title">
                              ₹{item.price}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* course-nav-tab-end */}
          <div className="row text-center">
            <div className="col-lg-12">
              <div className="course-btn mt-0">
                <Link className="tp-btn" href="/course-list">
                  Browse All Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurCourse;
