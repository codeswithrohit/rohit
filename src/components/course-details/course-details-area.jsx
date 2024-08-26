import review_content from '@/src/data/review-data';
import Link from 'next/link';
import React, { useState, useEffect } from "react";
import { firebase } from "../../Firebase/config";

const CourseDetailsArea = ({id}) => {
  const [coursedata, setCourseData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
   const urlParams = new URLSearchParams(window.location.search);
   const id = urlParams.get("id");
 
   const db = firebase.firestore();
   const productRef = db.collection("courses").doc(id);
 
   productRef.get().then((doc) => {
     if (doc.exists) {
       // Use doc.id to include the document ID in the product data
       setCourseData({ ...doc.data(), id: doc.id });
     } else {
       console.log("Document not found!");
     }
     setIsLoading(false);
   });
 }, []);
 if (isLoading) {
   return (
    /* From Uiverse.io by devAaus */ 
<div class="flex-col gap-4 w-full flex items-center justify-center">
  <div
    class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
  >
    <div
      class="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
    ></div>
  </div>
</div>

   );
 }
    return (
        <>
         <section className="c-details-area pt-10 pb-10 wow fadeInUp" data-wow-duration=".8s" data-wow-delay=".2s">
         <div className="container">
            <div className="row">
               <div className="col-lg-8 col-md-12">
                  <div className="c-details-wrapper mr-25">
                     <div className="c-details-thumb p-relative mb-10">
                        <img src={coursedata.thumbnail} alt="details-bg" />
                        {/* <div className="c-details-ava d-md-flex align-items-center">
                           <img src="/assets/img/course/c-details-ava-01.png" alt="avata" />
                           <span>By <a href="#">Emilia Jonas</a></span>
                        </div> */}
                     </div>
                     <div className="course-details-content mb-15">
                        <div className="tpcourse__category mb-15">
                           <ul className="tpcourse__price-list d-flex align-items-center">
                              <li><a className="c-color-green" href="#">Maths</a></li>
                              <li><a className="c-color-yellow" href="#">Science</a></li>
                              <li><a className="c-color-yellow" href="#">SST</a></li>
                              <li><a className="c-color-yellow" href="#">English</a></li>
                           </ul>
                        </div>
                        <div className="tpcourse__ava-title mb-25">
                           <h4 className="c-details-title"><a href="#">{coursedata.courseName}</a></h4>
                        </div>
                        <div className="tpcourse__meta course-details-list">
                           <ul className="d-flex align-items-center">
                              <li>
                                 <div className="rating-gold d-flex align-items-center">
                                    <p>4.7</p>
                                    <i className="fi fi-ss-star"></i>
                                    <i className="fi fi-ss-star"></i>
                                    <i className="fi fi-ss-star"></i>
                                    <i className="fi fi-ss-star"></i>
                                    <i className="fi fi-rs-star"></i>
                                    <span>(125)</span>
                                 </div>
                              </li>
                              <li><img src="/assets/img/icon/c-meta-01.png" alt="meta-icon" /> <span>{coursedata.totalClasses} Classes</span></li>
                              <li><img src="/assets/img/icon/c-meta-02.png" alt="meta-icon" /> <span>{coursedata.totalStudents} Students</span></li>
                           </ul>
                        </div>
                     </div>
                     <div className="c-details-about mb-10">
                        <h5 className="tp-c-details-title mb-2">About This Course</h5>
                        <p style={{ whiteSpace: 'pre-wrap' }}>{coursedata.aboutCourse}</p>

                     </div>
                     <div className="cor-details-instructor mb-4">
                        <h4 className="tp-c-details-title mb-4">Instructor</h4>
                        {coursedata.instructors && coursedata.instructors.length > 0 ? (
                    coursedata.instructors.map((instructor, index) => (
                      <><div key={index} /><div className="course-instructor-details d-flex f-wrap align-items-center">
                          <div className="course-avata mr-30 mb-8">
                             <img src={instructor.profileImage} alt="avata-thumb" />
                          </div>
                          <div className="course-avatar-details mb-8">
                             <h5 className="c-avata-title">{instructor.name}</h5>
                             <h5>{instructor.subject} Teacher</h5>
                             <h5 >{instructor.education}</h5>
                           
                          </div>
                       </div></>
                   ))
                  ) : (
                    <p>No instructors available for this course.</p>
                  )}
                </div>
                     <div className="c-details-review pb-15">
                        <div className="c-review-title-wrapper">
                           <h5 className="c-review-title mb-10">Review</h5>
                        </div>
                        <div className="course-reviewer-item-wrapper">

                              {review_content.map((item, i) => 
                                 <div key={i} className="course-reviewer-item d-flex mb-25">
                                 <div className="course-review-ava">
                                    <img src={item.img} alt="details-avata" />
                                 </div>
                                 <div className="course-review-content p-relative">
                                    <h5 className="course-ava-title mb-15">{item.name}</h5>
                                    <div className="tpcourse__rating-icon d-flex align-items-center mb-10">
                                       <i className="fi fi-ss-star"></i>
                                       <i className="fi fi-ss-star"></i>
                                       <i className="fi fi-ss-star"></i>
                                       <i className="fi fi-ss-star"></i>
                                       <i className="fi fi-rs-star"></i>
                                    </div>
                                    <p>{item.review_text}</p>
                                    <div className="c-reviewer-time">
                                       <span>{item.review_time}</span>
                                    </div>
                                 </div>
                              </div>
                                 
                                 )
                              }

                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-lg-4 col-md-12">
                  <div className="c-details-sidebar">
                  <div className="c-video-thumb p-relative mb-25">
                {/* Video Section */}
                {coursedata.introVideo ? (
                  <video controls className="rounded-lg shadow-lg" preload="metadata">
                    <source src={coursedata.introVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <p>No video available for this course.</p>
                )}
              </div>
                     <div className="course-details-widget">
                        <div className="cd-video-price">
                           <h3 className="pricing-video text-center mb-15"> ₹{coursedata.offerPrice}</h3>
                           <div className="cd-pricing-btn text-center mb-30">
                              {/* <Link className="tp-vp-btn" href="/course-details">Add To Cart</Link> */}
                              <Link className="tp-vp-btn-green" href="/course-details">Enroll Now</Link>
                           </div>
                        </div>
                        <div className="cd-information mb-35">
                           <ul>
                              <li><i className="fa-light fa-calendars"></i> <label>Lesson</label> <span>{coursedata.totalClasses}</span></li>
                              <li><i className="fi fi-rr-chart-pie-alt"></i> <label>Quizess</label> <span>6</span></li>
                              <li><i className="fi fi-rr-user"></i> <label>Students</label> <span>{coursedata.totalStudents}</span></li>
                              <li><i className="fa-light fa-clock-desk"></i> <label>Duration</label> <span>{coursedata.totalDuration} Hours</span></li>
                              <li><i className="fi fi-sr-stats"></i> <label>Skill Level</label> <span>Beginner</span></li>
                              <li><i className="fi fi-rr-comments"></i> <label>Language</label> <span>English & Hindi</span></li>
                              <li><i className="fi fi-rs-diploma"></i> <label>Certificate</label> <span>Yes</span></li>
                           </ul>
                        </div>
                      
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

   
        </>
    );
};

export default CourseDetailsArea;