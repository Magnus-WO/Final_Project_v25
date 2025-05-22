import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import HeroSection from "./Pages/HeroSection/HeroSection";
import Album from "./Pages/Album/Album";
import BandSection from "./Pages/BandSection/BandSection";
import Faq from "./Pages/FAQ/Faq";
import Footer from "./Pages/Footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar></Navbar>

      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}

export default App;
