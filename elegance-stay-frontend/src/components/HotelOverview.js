import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import sanAndresImg from '../images/sanandres.jpg';
import bogotaImg from '../images/bogota.jpg';
import medellinImg from '../images/medellin.jpg';
import caliImg from '../images/cali.jpg';
import cartagenaImg from '../images/cartagena.jpg';
import { FaUmbrellaBeach, FaMountain, FaCity, FaTree, FaHotel } from 'react-icons/fa';

const HotelOverview = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [cityFilter, setCityFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/hotels');
        setHotels(response.data);
        setFilteredHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  useEffect(() => {
    let filtered = hotels;

    if (cityFilter) {
      filtered = filtered.filter(hotel => hotel.city === cityFilter);
    }

    if (categoryFilter) {
      filtered = filtered.filter(hotel => hotel.category === categoryFilter);
    }

    setFilteredHotels(filtered);
  }, [cityFilter, categoryFilter, hotels]);

  const handleHotelClick = (hotelId) => {
    navigate(`/hotels/${hotelId}`);
  };

  const handleCityFilter = (city) => {
    setCityFilter(prevCityFilter => (prevCityFilter === city ? '' : city));
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(prevCategoryFilter => (prevCategoryFilter === category ? '' : category));
  };

  const cityImages = {
    'San Andres': sanAndresImg,
    'Bogota': bogotaImg,
    'Medellin': medellinImg,
    'Cali': caliImg,
    'Cartagena': cartagenaImg,
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Hoteles Disponibles</h1>
        
        {/* Filtros de ciudades */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Mejores Destinos a Visitar</h2>
          <div className="flex space-x-6">
            {['San Andres', 'Bogota', 'Medellin', 'Cali', 'Cartagena'].map(city => (
              <button
                key={city}
                className={`relative flex-shrink-0 w-64 h-56 rounded-lg shadow-lg transition-transform transform ${
                  cityFilter === city ? 'scale-105 ring-4 ring-pink-600' : ''
                }`}
                onClick={() => handleCityFilter(city)}
                style={{
                  backgroundImage: `url(${cityImages[city]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  marginRight: '10px',
                }}
              >
                <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg font-bold">
                  {city}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Filtros de categorías */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Categorías</h2>
          <div className="flex justify-center space-x-8">
            {[
              { label: 'Todos', icon: <FaHotel />, category: '' },
              { label: 'Playa', icon: <FaUmbrellaBeach />, category: 'playa' },
              { label: 'Montaña', icon: <FaMountain />, category: 'montaña' },
              { label: 'Ciudad', icon: <FaCity />, category: 'ciudad' },
              { label: 'Pueblo', icon: <FaTree />, category: 'pueblo' },
            ].map(({ label, icon, category }) => (
              <button
                key={label}
                className={`flex flex-col items-center justify-center flex-shrink-0 w-24 h-24 rounded-full shadow-lg transition-transform transform ${
                  categoryFilter === category ? 'bg-pink-600 text-white scale-105' : 'bg-white text-gray-800'
                }`}
                onClick={() => handleCategoryFilter(category)}
              >
                <div className="text-3xl">{icon}</div>
                <span className="block mt-2 text-sm font-semibold">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Hoteles disponibles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl border border-gray-300"
              onClick={() => handleHotelClick(hotel._id)}
            >
              <div className="relative">
                <img
                  src={`http://localhost:5001/${hotel.image}`}
                  alt={hotel.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 left-2 bg-pink-600 text-white px-2 py-1 rounded-full text-sm font-bold">
                  ${hotel.price} / noche
                </div>
                <div className="absolute top-10 left-2 bg-pink-600 text-white px-2 py-1 rounded-full text-sm font-bold">
                  {hotel.city}
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{hotel.name}</h2>
                <p className="text-gray-600">{hotel.location}</p>
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => handleHotelClick(hotel._id)}
                    className="bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-700 transition"
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelOverview;
