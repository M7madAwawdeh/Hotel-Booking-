import React from 'react';
    import { Link } from 'react-router-dom';

    function Header({ isAdmin, onLogout }) {
      return (
        <header className="bg-blue-700 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold tracking-wide">Hotel Booking</Link>
            <nav>
              {isAdmin ? (
                <>
                  <Link to="/admin" className="ml-4 hover:text-blue-200 transition-colors duration-200">Admin</Link>
                  <button onClick={onLogout} className="ml-4 hover:text-blue-200 transition-colors duration-200">Logout</button>
                </>
              ) : (
                <Link to="/admin" className="ml-4 hover:text-blue-200 transition-colors duration-200">Admin Login</Link>
              )}
            </nav>
          </div>
        </header>
      );
    }

    export default Header;
