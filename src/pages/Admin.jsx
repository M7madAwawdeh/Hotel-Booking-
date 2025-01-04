import React, { useState, useEffect } from 'react';
    import { db } from '../utils/db';

    function Admin() {
      const [rooms, setRooms] = useState([]);
      const [bookings, setBookings] = useState([]);
      const [newRoom, setNewRoom] = useState({ number: '', floor: '', price: '', description: '', available: true });
      const [editRoomId, setEditRoomId] = useState(null);
      const [editRoom, setEditRoom] = useState({ number: '', floor: '', price: '', description: '', available: true });
      const [roomSearchTerm, setRoomSearchTerm] = useState('');
      const [bookingSearchTerm, setBookingSearchTerm] = useState('');

      useEffect(() => {
        const fetchRooms = async () => {
          const allRooms = await db.rooms.toArray();
          setRooms(allRooms);
        };
        const fetchBookings = async () => {
          const allBookings = await db.bookings.orderBy('id').reverse().toArray();
          setBookings(allBookings);
        };
        fetchRooms();
        fetchBookings();
      }, []);

      const handleAddRoom = async () => {
        if (!newRoom.number || !newRoom.floor || !newRoom.price || !newRoom.description) {
          alert('Please fill all fields');
          return;
        }
        await db.rooms.add({
          number: newRoom.number,
          floor: newRoom.floor,
          price: parseFloat(newRoom.price),
          description: newRoom.description,
          available: newRoom.available,
        });
        setNewRoom({ number: '', floor: '', price: '', description: '', available: true });
        const allRooms = await db.rooms.toArray();
        setRooms(allRooms);
      };

      const handleDeleteRoom = async (id) => {
        await db.rooms.delete(id);
        const allRooms = await db.rooms.toArray();
        setRooms(allRooms);
      };

      const handleEditRoom = (room) => {
        setEditRoomId(room.id);
        setEditRoom({ number: room.number, floor: room.floor, price: room.price, description: room.description, available: room.available });
      };

      const handleUpdateRoom = async () => {
         if (!editRoom.number || !editRoom.floor || !editRoom.price || !editRoom.description) {
          alert('Please fill all fields');
          return;
        }
        await db.rooms.update(editRoomId, {
          number: editRoom.number,
          floor: editRoom.floor,
          price: parseFloat(editRoom.price),
          description: editRoom.description,
          available: editRoom.available,
        });
        setEditRoomId(null);
        setEditRoom({ number: '', floor: '', price: '', description: '', available: true });
        const allRooms = await db.rooms.toArray();
        setRooms(allRooms);
      };

      const handleAcceptBooking = async (bookingId) => {
        const booking = await db.bookings.get(bookingId);
        if (booking) {
          await db.bookings.update(bookingId, { status: 'accepted' });
          const room = await db.rooms.get(booking.roomId);
          if (room) {
            await db.rooms.update(room.id, { available: false });
          }
        }
        const allBookings = await db.bookings.orderBy('id').reverse().toArray();
        setBookings(allBookings);
        const allRooms = await db.rooms.toArray();
        setRooms(allRooms);
      };

      const handleRejectBooking = async (bookingId) => {
        await db.bookings.update(bookingId, { status: 'rejected' });
         const allBookings = await db.bookings.orderBy('id').reverse().toArray();
        setBookings(allBookings);
      };

      const filteredRooms = rooms.filter(room =>
        Object.values(room).some(value =>
          String(value).toLowerCase().includes(roomSearchTerm.toLowerCase())
        )
      );

      const filteredBookings = bookings.filter(booking =>
        Object.values(booking).some(value =>
          String(value).toLowerCase().includes(bookingSearchTerm.toLowerCase())
        )
      );

      return (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-blue-800 tracking-wide">Admin Panel</h1>

          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Add New Room</h2>
          <div className="mb-6 bg-white p-4 rounded shadow-md">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Room Number"
                className="border p-2 mr-2 rounded w-full md:w-auto"
                value={newRoom.number}
                onChange={(e) => setNewRoom({ ...newRoom, number: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Floor"
                className="border p-2 mr-2 rounded w-full md:w-auto"
                value={newRoom.floor}
                onChange={(e) => setNewRoom({ ...newRoom, floor: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                placeholder="Price"
                className="border p-2 mr-2 rounded w-full md:w-auto"
                value={newRoom.price}
                onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Description"
                className="border p-2 mr-2 rounded w-full md:w-auto"
                value={newRoom.description}
                onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
              />
            </div>
             <label className="inline-flex items-center mt-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600 rounded"
                checked={newRoom.available}
                onChange={(e) => setNewRoom({ ...newRoom, available: e.target.checked })}
              />
              <span className="ml-2 text-gray-700">Available</span>
            </label>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 transition-colors duration-200" onClick={handleAddRoom}>Add Room</button>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-700">Manage Rooms</h2>
           <div className="mb-4">
              <input
                type="text"
                placeholder="Search Rooms"
                className="border p-2 rounded w-full"
                value={roomSearchTerm}
                onChange={(e) => setRoomSearchTerm(e.target.value)}
              />
            </div>
          <div className="overflow-x-auto bg-white rounded shadow-md">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 border-b text-blue-700">ID</th>
                  <th className="py-2 px-4 border-b text-blue-700">Number</th>
                  <th className="py-2 px-4 border-b text-blue-700">Floor</th>
                  <th className="py-2 px-4 border-b text-blue-700">Price</th>
                  <th className="py-2 px-4 border-b text-blue-700">Description</th>
                  <th className="py-2 px-4 border-b text-blue-700">Available</th>
                  <th className="py-2 px-4 border-b text-blue-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRooms.map((room) => (
                  <tr key={room.id} className="hover:bg-gray-100 transition-colors duration-200">
                    <td className="py-2 px-4 border-b text-blue-700">{room.id}</td>
                    <td className="py-2 px-4 border-b text-blue-700">{room.number}</td>
                    <td className="py-2 px-4 border-b text-blue-700">{room.floor}</td>
                    <td className="py-2 px-4 border-b text-blue-700">${room.price}</td>
                    <td className="py-2 px-4 border-b text-blue-700">{room.description}</td>
                     <td className="py-2 px-4 border-b text-blue-700">{room.available ? 'Yes' : 'No'}</td>
                    <td className="py-2 px-4 border-b">
                      {editRoomId === room.id ? (
                        <div className="flex flex-col md:flex-row gap-2">
                          <input
                            type="text"
                            placeholder="Number"
                            className="border p-1 rounded w-full md:w-auto"
                            value={editRoom.number}
                            onChange={(e) => setEditRoom({ ...editRoom, number: e.target.value })}
                          />
                          <input
                            type="text"
                            placeholder="Floor"
                            className="border p-1 rounded w-full md:w-auto"
                            value={editRoom.floor}
                            onChange={(e) => setEditRoom({ ...editRoom, floor: e.target.value })}
                          />
                          <input
                            type="number"
                            placeholder="Price"
                            className="border p-1 rounded w-full md:w-auto"
                            value={editRoom.price}
                            onChange={(e) => setEditRoom({ ...editRoom, price: e.target.value })}
                          />
                           <input
                            type="text"
                            placeholder="Description"
                            className="border p-1 rounded w-full md:w-auto"
                            value={editRoom.description}
                            onChange={(e) => setEditRoom({ ...editRoom, description: e.target.value })}
                          />
                           <label className="inline-flex items-center mt-2">
                              <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-blue-600 rounded"
                                checked={editRoom.available}
                                onChange={(e) => setEditRoom({ ...editRoom, available: e.target.checked })}
                              />
                              <span className="ml-2 text-gray-700">Available</span>
                            </label>
                          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-1 transition-colors duration-200" onClick={handleUpdateRoom}>Update</button>
                          <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-1 px-2 rounded transition-colors duration-200" onClick={() => setEditRoomId(null)}>Cancel</button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded transition-colors duration-200" onClick={() => handleEditRoom(room)}>Edit</button>
                          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded transition-colors duration-200" onClick={() => handleDeleteRoom(room.id)}>Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-700">Manage Bookings</h2>
           <div className="mb-4">
              <input
                type="text"
                placeholder="Search Bookings"
                className="border p-2 rounded w-full"
                value={bookingSearchTerm}
                onChange={(e) => setBookingSearchTerm(e.target.value)}
              />
            </div>
          <div className="overflow-x-auto bg-white rounded shadow-md">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 border-b text-blue-700">ID</th>
                  <th className="py-2 px-4 border-b text-blue-700">Room ID</th>
                  <th className="py-2 px-4 border-b text-blue-700">Name</th>
                  <th className="py-2 px-4 border-b text-blue-700">Email</th>
                  <th className="py-2 px-4 border-b text-blue-700">Phone</th>
                  <th className="py-2 px-4 border-b text-blue-700">Status</th>
                  <th className="py-2 px-4 border-b text-blue-700">Message</th>
                  <th className="py-2 px-4 border-b text-blue-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-100 transition-colors duration-200">
                    <td className="py-2 px-4 border-b text-blue-700">{booking.id}</td>
                    <td className="py-2 px-4 border-b text-blue-700">{booking.roomId}</td>
                    <td className="py-2 px-4 border-b text-blue-700">{booking.name}</td>
                    <td className="py-2 px-4 border-b text-blue-700">{booking.email}</td>
                    <td className="py-2 px-4 border-b text-blue-700">{booking.phone}</td>
                    <td className="py-2 px-4 border-b text-blue-700">{booking.status}</td>
                     <td className="py-2 px-4 border-b text-blue-700">{booking.message}</td>
                    <td className="py-2 px-4 border-b">
                      {booking.status === 'pending' && (
                        <div className="flex gap-2">
                          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded transition-colors duration-200" onClick={() => handleAcceptBooking(booking.id)}>Accept</button>
                          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded transition-colors duration-200" onClick={() => handleRejectBooking(booking.id)}>Reject</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    export default Admin;
