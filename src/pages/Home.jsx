import React, { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import { db } from '../utils/db';

    function Home() {
      const [rooms, setRooms] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [floorFilter, setFloorFilter] = useState('');
      const [minPriceFilter, setMinPriceFilter] = useState('');
      const [maxPriceFilter, setMaxPriceFilter] = useState('');

      useEffect(() => {
        const fetchRooms = async () => {
          const allRooms = await db.rooms.toArray();
          setRooms(allRooms.filter(room => room.available));
        };
        fetchRooms();
      }, []);

      const filteredRooms = rooms.filter(room => {
        const searchMatch = Object.values(room).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
        const floorMatch = floorFilter === '' || String(room.floor) === floorFilter;
        const minPriceMatch = minPriceFilter === '' || room.price >= parseFloat(minPriceFilter);
        const maxPriceMatch = maxPriceFilter === '' || room.price <= parseFloat(maxPriceFilter);
        return searchMatch && floorMatch && minPriceMatch && maxPriceMatch;
      });

      const uniqueFloors = [...new Set(rooms.map(room => room.floor))];

      return (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-blue-800 tracking-wide">Available Rooms</h1>
           <div className="flex flex-col md:flex-row gap-4 mb-6">
              <input
                type="text"
                placeholder="Search Rooms"
                className="border p-2 rounded w-full md:w-1/4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="border p-2 rounded w-full md:w-1/6"
                value={floorFilter}
                onChange={(e) => setFloorFilter(e.target.value)}
              >
                <option value="">All Floors</option>
                {uniqueFloors.map(floor => (
                  <option key={floor} value={floor}>{floor}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Min Price"
                className="border p-2 rounded w-full md:w-1/6"
                value={minPriceFilter}
                onChange={(e) => setMinPriceFilter(e.target.value)}
              />
               <input
                type="number"
                placeholder="Max Price"
                className="border p-2 rounded w-full md:w-1/6"
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(e.target.value)}
              />
            </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <div key={room.id} className="border rounded-lg shadow-md bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-blue-700 mb-2">{room.number}</h2>
                  <p className="text-gray-700 mb-1">Floor: {room.floor}</p>
                  <p className="text-gray-700 mb-3">Price: <span className="font-medium">${room.price}</span></p>
                  <p className="text-gray-600 text-sm">{room.description}</p>
                </div>
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <Link to={`/booking/${room.id}`} className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">Book Now</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    export default Home;
