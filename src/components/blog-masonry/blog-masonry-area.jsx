import Link from "next/link";
import React from "react";

const BlogMasonryArea = ({ blogs }) => {
  console.log("blogs", blogs);

  return (
    <section className="blog-area pt-10 pb-15">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title mb-15 text-center">
              <h2 className="tp-section-title mb-10">Latest Blogs & News</h2>
            </div>
          </div>
        </div>
        <div className="row mb-10">
          {blogs.map((item, i) => (
            <div key={i} className="col-lg-4 col-md-6">
              <div
                className="tp-blog mb-10 wow fadeInUp"
                data-wow-duration=".8s"
                data-wow-delay=".4s"
              >
                <div className="tp-blog__thumb p-relative">
                  <div className="fix blog-round">
                    <Link href={`/blog-details?id=${item.id}`} >
                      <img src={item.imageURL} alt="blog-img" />
                    </Link>
                  </div>
                  <div className="tp-blog__meta-ab">
                    <Link href={`/blog-details?id=${item.id}`}>{new Date(item.date).toLocaleDateString()}</Link>
                  </div>
                </div>
                <div className="tp-blog__content blog-box p-relative">
                  <h3 className="tp-blog__title mb-15 mt-10">
                    <Link href={`/blog-details?id=${item.id}`}>{item.heading}</Link>
                  </h3>
                  <p>{item.description.slice(0, 100)}...</p> {/* Show a snippet of the description */}
                  
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="row">
          <div className="col-lg-12">
            <div className="blog-btn text-center">
              <Link href="/blog-grid" className="tp-btn">
                All Blog
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default BlogMasonryArea;
