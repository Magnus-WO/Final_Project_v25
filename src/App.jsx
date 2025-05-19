import Navbar from "./Components/Navbar/Navbar";
import HeroSection from "./Components/HeroSection/HeroSection";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <HeroSection></HeroSection>
      <Outlet></Outlet>
    </>
  );
}

export default App;
