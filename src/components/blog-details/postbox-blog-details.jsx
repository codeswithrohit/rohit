import comments_data from "@/src/data/comments-data";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { firebase } from "../../Firebase/config";
import RecentPost from "../blog/recent-post";
import 'tailwindcss/tailwind.css';
const PostboxBlogDetails = () => {
  const [blogdata, setBlogData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
   const urlParams = new URLSearchParams(window.location.search);
   const id = urlParams.get("id");
 
   const db = firebase.firestore();
   const productRef = db.collection("blogs").doc(id);
 
   productRef.get().then((doc) => {
     if (doc.exists) {
       // Use doc.id to include the document ID in the product data
       setBlogData({ ...doc.data(), id: doc.id });
     } else {
       console.log("Document not found!");
     }
     setIsLoading(false);
   });
 }, []);
 if (isLoading) {
   return (
    /* From Uiverse.io by devAaus */ 
<div class="min-h-screen flex-col gap-4 w-full flex items-center justify-center">
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

 console.log("blogdata",blogdata)
  return (
    <>
      <div
        className="postbox__area pt-10 pb-10 wow fadeInUp"
        data-wow-duration=".8s"
        data-wow-delay=".2s"
      >
        <div className="container">
          <div className="row">
            <div className="col-xxl-8 col-xl-8 col-lg-7 col-md-12">
              <div className="postbox__wrapper pr-20">


                <article className="postbox__item format-image mb-10 transition-3">
                  <div className="postbox__thumb w-img mb-10">
                    <Link href="#">
                      <img src={blogdata.imageURL} alt="" />
                    </Link>
                  </div>
                  <div className="postbox__content">
                    <div className="postbox__meta">
                      <span>
                        <i className="fi fi-rr-calendar"></i>{new Date(blogdata.date).toLocaleDateString()}
                      </span>
                      <span>
                        <a href="#">
                          <i className="fi fi-rr-user"></i> ROHIT KUMAR
                        </a>
                      </span>
                      <span>
                        <a href="#">
                          <i className="fi fi-rr-comments"></i> 02 Comments
                        </a>
                      </span>
                    </div>
                    <h3 className="postbox__title">
                    {blogdata.heading}
                    </h3>
                    <div
        className="prose prose-white" // Tailwind CSS prose class for styling content
        dangerouslySetInnerHTML={{ __html: blogdata.description }}
      />




<iframe
                className="w-full h-64 my-10 rounded-lg md:h-80 md:my-0"
                src={`https://www.youtube.com/embed/${blogdata.link}`}
                title={blogdata.heading}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
                  </div>
                </article>


                {/* <div className="postbox__comment mb-15">
                  <h3 className="postbox__comment-title">3 Comments</h3>
                  <ul>

                    {comments_data.map((item, i) =>                       
                      <li key={i} className={item?.children}>
                      <div className="postbox__comment-box grey-bg">
                        <div className="postbox__comment-info d-flex">
                          <div className="postbox__comment-avater mr-20">
                            <img
                              src={item.img}
                              alt=""
                            />
                          </div>
                          <div className="postbox__comment-name">
                            <h5>{item.name}</h5>
                            <span className="post-meta">{item.date}</span>
                          </div>
                        </div>
                        <div className="postbox__comment-text ml-15">
                          <p>
                            {item.comment}
                          </p>
                          <div className="postbox__comment-reply">
                            <a href="#">Reply</a>
                          </div>
                        </div>
                      </div>
                    </li>
                      ) 
                    }                    
                  </ul>
                </div>

                <div className="postbox__comment-form">
        <h3 className="postbox__comment-form-title">Write a comment</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6">
              <div className="postbox__comment-input">
                <input type="text" placeholder="Your Name" />
              </div>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6">
              <div className="postbox__comment-input">
                <input type="email" placeholder="Your Email" />
              </div>
            </div>
            <div className="col-xxl-12">
              <div className="postbox__comment-input">
                <input type="text" placeholder="Website" />
              </div>
            </div>
            <div className="col-xxl-12">
              <div className="postbox__comment-input">
                <textarea placeholder="Enter your comment ..."></textarea>
              </div>
            </div>
            <div className="col-xxl-12">
              <div className="postbox__comment-btn">
                <button type="submit" style={{backgroundColor:'blue',padding:16,color:'white',fontWeight:'bold'}}>
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </form>
      </div> */}


              </div>
            </div>
            {/* <div className="col-xxl-4 col-xl-4 col-lg-5 col-md-12">
              <div className="sidebar__wrapper">
                <RecentPost />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostboxBlogDetails;
