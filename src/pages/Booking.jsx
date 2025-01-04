import React, { useState, useEffect } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import { db } from '../utils/db';

    function Booking() {
      const { roomId } = useParams();
      const navigate = useNavigate();
      const [room, setRoom] = useState(null);
      const [bookingData, setBookingData] = useState({
        name: '',
        email: '',
        phone: '',
      });

      useEffect(() => {
        const fetchRoom = async () => {
          const foundRoom = await db.rooms.get(parseInt(roomId));
          setRoom(foundRoom);
        };
        fetchRoom();
      }, [roomId]);

      const handleInputChange = (e) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!bookingData.name || !bookingData.email || !bookingData.phone) {
          alert('Please fill all fields');
          return;
        }
        await db.bookings.add({
          roomId: parseInt(roomId),
          ...bookingData,
          status: 'pending',
          message: `Room ${room.number} booked by ${bookingData.name}`,
        });
        alert('Booking request submitted!');
        navigate('/');
      };

      if (!room) {
        return <div className="container mx-auto p-4">Loading...</div>;
      }

      return (
        <div className="container mx-auto p-4 bg-white rounded shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-blue-800 tracking-wide">Book Room {room.number}</h1>
          <p className="text-gray-700 mb-2">Floor: {room.floor}</p>
          <p className="text-gray-700 mb-4">Price: <span className="font-medium">${room.price}</span></p>
          <p className="text-gray-600 text-sm mb-6">{room.description}</p>

          <form onSubmit={handleSubmit} className="max-w-md">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={bookingData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={bookingData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={bookingData.phone}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200">Submit Booking</button>
          </form>
        </div>
      );
    }

    export default Booking;
