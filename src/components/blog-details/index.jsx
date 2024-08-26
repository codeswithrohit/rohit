
import React from "react";
import CounterArea from "../../common/counter-area";
import PostboxBlogDetails from "./postbox-blog-details";

const BlogDetails = ({id}) => {
  return (
    <>
      <PostboxBlogDetails id={id} />
      <CounterArea />
    </>
  );
};

export default BlogDetails;
