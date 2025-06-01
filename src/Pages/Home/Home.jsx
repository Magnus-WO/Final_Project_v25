import React from "react";
import HeroSection from "../HeroSection/HeroSection";
import BandSection from "../BandSection/BandSection";
import Faq from "../FAQ/Faq";
import Album from "../../Components/Album/Album";

const Home = () => {
  return (
    <>
      <HeroSection></HeroSection>
      <Album></Album>
      <BandSection></BandSection>
      <Faq></Faq>
    </>
  );
};

export default Home;
