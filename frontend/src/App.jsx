import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Service from "./Service";
import Counselors from "./Counselors"; 
import Admin from "./Admin";
import Support from "./Support";
import AboutUs from "./Aboutus";


function App() {
  const { pathname } = useLocation();
  const hideLayout = ["/", "/login", "/register"].includes(pathname.toLowerCase());

  return (
    <>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/service" element={<Service />} />
        <Route path="/counselors" element={<Counselors />} /> 
        <Route path="/support" element={<Support />} />   {/* lowercase */}
        <Route path="/about" element={<AboutUs />} />
        
        <Route path="/admin/appointments" element={<Admin />} /> 
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
