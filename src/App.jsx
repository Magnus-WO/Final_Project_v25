import Navbar from "./Components/Navbar/Navbar";
import HeroSection from "./Components/HeroSection/HeroSection";
import Album from "./Components/Album/Album";
import BandSection from "./Components/bandSection/BandSection";
import Faq from "./Pages/FAQ/Faq";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <HeroSection></HeroSection>
      <BandSection></BandSection>
      <Faq></Faq>
      <Outlet></Outlet>
    </>
  );
}

export default App;
