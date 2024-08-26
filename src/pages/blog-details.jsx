import React, { useEffect, useState } from "react";
import SEO from '../common/seo';
import BlogDetails from '../components/blog-details';
import WrapperFour from '../layout/wrapper-4';
import { useRouter } from "next/router";
const index = () => {
    const [id, setId] = useState(null);
    const router = useRouter();
  
    useEffect(() => {
      // Check if the code is running in the browser
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");
        setId(idParam);
      }
    }, [router]);
    return (
        <WrapperFour>
            <SEO pageTitle={"Blog Details"} />
            {id && <BlogDetails id={id}/>}
        </WrapperFour>
    );
};

export default index;