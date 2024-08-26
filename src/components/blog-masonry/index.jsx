
import React from "react";
import Breadcrumb from "../bredcrumb/breadcrumb";
import CounterArea from "../homes/home-3/counter-area";
import BlogMasonryArea from "./blog-masonry-area";

const BlogMasonry = ({blogs}) => {
  return (
    <>
      <BlogMasonryArea blogs={blogs} />
      <CounterArea />
    </>
  );
};

export default BlogMasonry;
