import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DonorList from './pages/DonorList';
import Register from './pages/Register';
import EmergencyRequest from './pages/EmergencyRequest';
import Archives from './pages/Archives';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Support from './pages/Support';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans transition-colors duration-300">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donors" element={<DonorList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/emergency" element={<EmergencyRequest />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}
