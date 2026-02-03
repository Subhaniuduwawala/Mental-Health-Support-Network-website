import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingMusicPlayer from "./components/FloatingMusicPlayer";
import { MusicPlayerProvider } from "./contexts/MusicPlayerContext";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Service from "./Service";
import Counselors from "./Counselors"; 
import Admin from "./Admin";
import Support from "./Support";
import AboutUs from "./Aboutus";
import Profile from "./Profile";
import MusicList from "./MusicList";
import MiniGames from "./MiniGames";



function App() {
  const { pathname } = useLocation();
  const hideLayout = ["/", "/login", "/register"].includes(pathname.toLowerCase());

  return (
    <>
      {!hideLayout && <Navbar />}
      <main style={{ paddingTop: hideLayout ? 0 : '80px', paddingBottom: hideLayout ? 0 : '100px' }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/service" element={<Service />} />
          <Route path="/counselors" element={<Counselors />} /> 
          <Route path="/support" element={<Support />} />   {/* lowercase */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/music-list" element={<MusicList />} />
          <Route path="/mini-games" element={<MiniGames />} />
   
          
          <Route path="/admin/appointments" element={<Admin />} /> 
        </Routes>
      </main>
      {!hideLayout && <Footer />}
      {!hideLayout && <FloatingMusicPlayer />}
    </>
  );
}

export default function Root() {
  return (
    <BrowserRouter>
      <MusicPlayerProvider>
        <App />
      </MusicPlayerProvider>
    </BrowserRouter>
  );
}
