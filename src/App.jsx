import React, { useState } from 'react';
    import { Routes, Route, useNavigate } from 'react-router-dom';
    import Home from './pages/Home';
    import Admin from './pages/Admin';
    import Booking from './pages/Booking';
    import Header from './components/Header';
    import AdminLogin from './pages/AdminLogin';

    function App() {
      const [isAdmin, setIsAdmin] = useState(false);
      const navigate = useNavigate();

      const handleLogin = (username, password) => {
        if (username === 'fintks' && password === 'fintks') {
          setIsAdmin(true);
          navigate('/admin');
        } else {
          alert('Invalid credentials');
        }
      };

      const handleLogout = () => {
        setIsAdmin(false);
        navigate('/');
      };

      return (
        <div className="App">
          <Header isAdmin={isAdmin} onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={isAdmin ? <Admin /> : <AdminLogin onLogin={handleLogin} />} />
            <Route path="/booking/:roomId" element={<Booking />} />
          </Routes>
        </div>
      );
    }

    export default App;
