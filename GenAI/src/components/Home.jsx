import React from "react";
import Hero from "./Hero";
import Features from "./Features";
import ResumeUpload from "./ResumeUpload";
import ResumeEnhancer from "./ResumeEnhancer";
import Internship from "./Internship";
import AboutUs from "./AboutUs";
import Footer from "./Footer";


export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <ResumeEnhancer />

export default function Home({ onProtectedAction }) {
  return (
    <>
      <Hero onProtectedAction={onProtectedAction} />
      <Features />
      <ResumeEnhancer />
      <ResumeUpload onProtectedAction={onProtectedAction} />

      <Footer />
    </>
  );
}

