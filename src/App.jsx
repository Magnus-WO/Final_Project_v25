import Navbar from "./Components/Navbar/Navbar";
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
