import React, { useState } from 'react';

    function AdminLogin({ onLogin }) {
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');

      const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
      };

      return (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-blue-800 tracking-wide">Admin Login</h1>
          <form onSubmit={handleSubmit} className="max-w-md bg-white p-6 rounded shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200">Login</button>
          </form>
        </div>
      );
    }

    export default AdminLogin;
