import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import LiveChat from './components/LiveChat';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Artists from './pages/Artists';
import Booking from './pages/Booking';
import Pricing from './pages/Pricing';
import Aftercare from './pages/Aftercare';
import Offers from './pages/Offers';
import Contact from './pages/Contact';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/aftercare" element={<Aftercare />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
      <LiveChat />
    </BrowserRouter>
  );
}
