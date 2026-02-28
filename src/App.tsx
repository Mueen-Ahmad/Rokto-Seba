import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DonorList from './pages/DonorList';
import Register from './pages/Register';
import EmergencyRequest from './pages/EmergencyRequest';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donors" element={<DonorList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/emergency" element={<EmergencyRequest />} />
        </Routes>
        
        <footer className="bg-white border-t py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
            <p>© 2024 Rokto Seba. All rights reserved.</p>
            <p className="mt-2">Made with ❤️ for humanity</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}
