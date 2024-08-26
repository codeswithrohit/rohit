import { animationCreate } from "@/utils/utils";
import React, {useEffect} from "react";
import BackToTop from "../lib/BackToTop";
import Footer from "./footers/footer";
import Header from "./headers/header";
import Navbar from "../components/Navbar";

const Wrapper = ({ children }) => {
  
  useEffect(() => {
    setTimeout(() => {
      animationCreate()
    }, 500);
  },[])

  return (
    <>
     <Navbar/>
      {children}
      <Footer />
      <BackToTop />
    </>
  );
};

export default Wrapper;
