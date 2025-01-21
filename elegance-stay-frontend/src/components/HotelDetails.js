import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const HotelDetails = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [reservation, setReservation] = useState({
    room: '',
    user: '', // Aquí deberías obtener el ID del usuario autenticado
    checkIn: '',
    checkOut: '',
    guests: 1,
  });

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const hotelResponse = await axios.get(`http://localhost:5001/api/hotels/${hotelId}`);
        setHotel(hotelResponse.data);

        const roomsResponse = await axios.get(`http://localhost:5001/api/rooms?hotel=${hotelId}`);
        setRooms(roomsResponse.data);
      } catch (error) {
        console.error('Error fetching hotel details:', error);
      }
    };

    fetchHotelDetails();
  }, [hotelId]);

  const handleReservationChange = (e) => {
    const { name, value } = e.target;
    setReservation((prev) => ({ ...prev, [name]: value }));
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/reservations', reservation);
      alert('Reserva realizada con éxito');
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  };

  if (!hotel) {
    return <div className="min-h-screen flex items-center justify-center text-gray-800 text-2xl">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-700">
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-300">
          {/* Imagen centrada con bordes redondeados */}
          <div className="flex justify-center items-center p-4">
            <div className="w-3/4 max-w-lg rounded-lg overflow-hidden shadow-md">
              <img
                src={`http://localhost:5001/${hotel.image}`}
                alt={hotel.name}
                className="w-full h-auto object-cover rounded-lg border border-gray-300"
              />
            </div>
          </div>
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-800 text-center">{hotel.name}</h1>
            <p className="text-gray-600 mb-4 text-center">{hotel.location}</p>
            <p className="text-gray-700 mb-8">{hotel.descripcion}</p>
            <h2 className="text-3xl font-semibold mb-6 text-pink-500">Habitaciones Disponibles</h2>
            <ul className="space-y-6">
              {rooms.map((room) => (
                <li
                  key={room._id}
                  className="bg-gray-100 p-6 rounded-lg shadow-md border border-gray-300 hover:shadow-lg transition"
                >
                  <p className="text-2xl font-bold text-gray-800">Tipo: {room.type}</p>
                  <p className="text-pink-500 font-semibold mt-2">Precio: ${room.price}</p>
                  <p className="text-gray-600">Servicios: {room.amenities.join(', ')}</p>
                  <p className="text-gray-600">Descripción: {room.description}</p>
                  <button
                    onClick={() => setReservation((prev) => ({ ...prev, room: room._id }))}
                    className="mt-4 bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 transition"
                  >
                    Seleccionar esta habitación
                  </button>
                </li>
              ))}
            </ul>
            <h2 className="text-3xl font-semibold mt-10 mb-6 text-pink-500">Realizar Reserva</h2>
            <form onSubmit={handleReservationSubmit} className="space-y-6">
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-700 font-semibold">Fecha de Entrada:</label>
                  <input
                    type="date"
                    name="checkIn"
                    value={reservation.checkIn}
                    onChange={handleReservationChange}
                    required
                    className="w-full p-3 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 outline-none transition hover:bg-pink-50"
                  />
                </div>
                <div className="flex-1 mt-4 md:mt-0">
                  <label className="block text-gray-700 font-semibold">Fecha de Salida:</label>
                  <input
                    type="date"
                    name="checkOut"
                    value={reservation.checkOut}
                    onChange={handleReservationChange}
                    required
                    className="w-full p-3 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 outline-none transition hover:bg-pink-50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Número de Huéspedes:</label>
                <input
                  type="number"
                  name="guests"
                  value={reservation.guests}
                  onChange={handleReservationChange}
                  required
                  className="w-full p-3 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 outline-none transition hover:bg-pink-50"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600 transition"
              >
                Reservar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
