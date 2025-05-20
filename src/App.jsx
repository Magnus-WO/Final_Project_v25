import Navbar from "./Components/Navbar/Navbar";
import HeroSection from "./Components/HeroSection/HeroSection";
import Album from "./Components/Album/Album";
import { Outlet } from "react-router-dom";
import BandSection from "./Components/bandSection/BandSection";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <HeroSection></HeroSection>
      <BandSection
        // className={bandSection}
        title="OUR BAND"
        ingres="Meet the band members of Diavola"
      ></BandSection>
      <Outlet></Outlet>
    </>
  );
}

export default App;
