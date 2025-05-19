import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// Import pages
import App from "../App";
import Home from "../Pages/Home/Home";
import Discography from "../Pages/Discography/Discography";
import Merch from "../Pages/Merch/Merch";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import Contact from "../Pages/Contact/Contact";
import NotFound from "../Pages/NotFound/NotFound";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/discography" element={<Discography />} />
      <Route path="/merch" element={<Merch />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
