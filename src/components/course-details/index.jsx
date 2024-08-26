
import React from "react";
import Breadcrumb from "../bredcrumb/breadcrumb";
import CounterArea from "../homes/home-3/counter-area";
import CourseArea from "./course-area";
import CourseDetailsArea from "./course-details-area";

const CourseDetails = ({id}) => {
  return (
    <>
      <CourseDetailsArea id={id} />
      {/* <CourseArea /> */}
      <CounterArea />
    </>
  );
};

export default CourseDetails;
