import axios from 'axios';
import React, { useState } from 'react';

const CreateHotel = ({ onClose, hotel, onHotelSaved }) => {
  const [formData, setFormData] = useState({
    name: hotel ? hotel.name : '',
    location: hotel ? hotel.location : '',
    rooms: hotel ? hotel.rooms : '',
    amenities: hotel ? hotel.amenities.join(',') : '',
    descripcion: hotel ? hotel.descripcion : '',
    image: null,
    price: hotel ? hotel.price : '',
    category: hotel ? hotel.category : 'playa', // Valor por defecto
    city: hotel ? hotel.city : 'San Andres', // Valor por defecto
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost:5001/api/hotels', data);
      onHotelSaved(response.data);
      onClose();
    } catch (error) {
      console.error('Error creating/updating hotel:', error);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 backdrop-blur-lg"
      style={{
        overflowY: 'auto', // Habilita scroll
      }}
    >
      <div
        className="bg-gradient-to-r from-lightGray via-white to-lightGray text-black p-8 rounded-2xl shadow-2xl w-full max-w-xl border border-gray-700 overflow-y-auto max-h-full"
        style={{
          scrollbarWidth: 'none', // Oculta scrollbar para Firefox
          msOverflowStyle: 'none', // Oculta scrollbar para IE/Edge
        }}
      >
        <style>
          {`
            ::-webkit-scrollbar {
              width: 8px;
            }

            ::-webkit-scrollbar-track {
              background: transparent; /* Fondo del track */
            }

            ::-webkit-scrollbar-thumb {
              background: linear-gradient(to bottom, rgba(255, 56, 92, 1), rgba(255, 56, 92, 0.8)); /* Color del thumb */
              border-radius: 10px;
            }

            ::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(to bottom, rgba(255, 56, 92, 0.8), rgba(255, 56, 92, 1)); /* Hover del thumb */
            }
          `}
        </style>
        <h1 className="text-5xl font-extrabold text-center mb-8 tracking-wide text-pink">
          {hotel ? 'Editar Hotel' : 'Crear Hotel'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="block font-bold mb-2 text-gray-700">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 rounded-lg bg-white text-black font-bold border border-gray-600 focus:ring-4 focus:ring-pink outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="block font-bold mb-2 text-gray-700">Ubicación</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-4 rounded-lg bg-white text-black font-bold border border-gray-600 focus:ring-4 focus:ring-pink outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="block font-bold mb-2 text-gray-700">Habitaciones</label>
            <input
              type="number"
              name="rooms"
              value={formData.rooms}
              onChange={handleChange}
              className="w-full p-4 rounded-lg bg-white text-black font-bold border border-gray-600 focus:ring-4 focus:ring-pink outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="block font-bold mb-2 text-gray-700">Precio</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-4 rounded-lg bg-white text-black font-bold border border-gray-600 focus:ring-4 focus:ring-pink outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="block font-bold mb-2 text-gray-700">Amenities</label>
            <input
              type="text"
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              className="w-full p-4 rounded-lg bg-white text-black font-bold border border-gray-600 focus:ring-4 focus:ring-pink outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="block font-bold mb-2 text-gray-700">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full p-4 rounded-lg bg-white text-black font-bold border border-gray-600 focus:ring-4 focus:ring-pink outline-none"
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label className="block font-bold mb-2 text-gray-700">Categoría</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-4 rounded-lg bg-white text-black font-bold border border-gray-600 focus:ring-4 focus:ring-pink outline-none"
            >
              <option value="playa">Playa</option>
              <option value="montaña">Montaña</option>
              <option value="finca">Finca</option>
              <option value="ciudad">Ciudad</option>
              <option value="pueblo">Pueblo</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="block font-bold mb-2 text-gray-700">Ciudad</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-4 rounded-lg bg-white text-black font-bold border border-gray-600 focus:ring-4 focus:ring-pink outline-none"
            >
              <option value="San Andres">San Andres</option>
              <option value="Bogota">Bogota</option>
              <option value="Medellin">Medellin</option>
              <option value="Cali">Cali</option>
              <option value="Cartagena">Cartagena</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="block font-bold mb-2 text-gray-700">Imagen</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full p-4 rounded-lg bg-white text-black font-bold border border-gray-600"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-200 ease-in-out"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-pink to-pink-light text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-light hover:to-pink transition-all duration-200 ease-in-out"
            >
              {hotel ? 'Actualizar Hotel' : 'Crear Hotel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateHotel;
