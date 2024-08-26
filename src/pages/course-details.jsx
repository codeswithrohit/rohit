import React, { useEffect, useState } from "react";
import SEO from "../common/seo";
import CourseDetails from "../components/course-details";
import WrapperFour from "../layout/wrapper-4";
import { useRouter } from "next/router";

const Index = () => {
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
      <SEO pageTitle={"Course Details"} />
      {id && <CourseDetails id={id} />}
    </WrapperFour>
  );
};

export default Index;
