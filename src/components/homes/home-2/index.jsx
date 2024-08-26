import BrandArea from "@/src/common/brand-area";
import CounterArea from "@/src/common/counter-area";
import InstructorArea from "@/src/common/instructor-area";
import SuitableArea from "@/src/common/suitable-area";
import AboutArea from "./about-area";
import BlogArea from "./blog-area";
import CategoryArea from "./category-area";
import ChooseArea from "../../../common/choose-area";
import CourseArea from "./course-area";
import HeroSlider from "./hero-slider";
import TestimonialAreaTwo from "./testimonial-area-2";
import VideoArea from "../../../common/video-area";
import React, { useEffect, useState } from 'react';
import { firebase } from '../../../Firebase/config';
const HomeTwo = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const snapshot = await firebase.firestore().collection('courses').get();
        const courseData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCourses(courseData);
      } catch (error) {
        toast.error('Error fetching courses: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);
  return (
    <>
      <HeroSlider />
      <BrandArea style_2={true} />
      <AboutArea />
      {/* <CategoryArea /> */}
      <CourseArea courses={courses} />
      <VideoArea />
      <CounterArea style_counter={true} />
      <ChooseArea style_2={true} />
      <InstructorArea style_2={true} />
      <TestimonialAreaTwo />
      <SuitableArea  style_2={true} />
      {/* <BlogArea /> */}
    </>
  );
};

export default HomeTwo;
