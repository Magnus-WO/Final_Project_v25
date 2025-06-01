import React from "react";
import HeroSection from "../HeroSection/HeroSection";
import BandSection from "../BandSection/BandSection";
import Faq from "../FAQ/Faq";
import Album from "../../Components/Album/Album";
import audioFilesWJ from "../../JS/audioWithoutJudgement";

const Home = () => {
  const withoutJudgementImage = "/Assets/Images/WJalbumArtwork.JPG";

  return (
    <>
      <HeroSection></HeroSection>
      <Album
        title="Without Judgement"
        audioFilesArray={audioFilesWJ}
        artWork={withoutJudgementImage}
      ></Album>
      <BandSection></BandSection>
      <Faq></Faq>
    </>
  );
};

export default Home;
