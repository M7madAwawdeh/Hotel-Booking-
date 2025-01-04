import Dexie from 'dexie';

    export const db = new Dexie('HotelDatabase');
    db.version(3).stores({
      rooms: '++id, number, floor, price, description, available',
      bookings: '++id, roomId, name, email, phone, status, message',
    });

    db.on('populate', () => {
      db.rooms.bulkAdd([
        { number: '101', floor: '1', price: 100, description: 'Standard room with a queen bed.', available: true },
        { number: '102', floor: '1', price: 120, description: 'Deluxe room with a king bed.', available: true },
        { number: '201', floor: '2', price: 150, description: 'Suite with a living area.', available: false },
        { number: '202', floor: '2', price: 180, description: 'Luxury suite with a balcony.', available: true },
      ]);
    });
