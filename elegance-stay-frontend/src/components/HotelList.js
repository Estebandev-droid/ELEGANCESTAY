import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Modal from './Modal';
import CreateHotel from './CreateHotel';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const HotelList = ({ newHotel }) => {
  const [hotels, setHotels] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    price: '',
    rooms: '',
    date: null,
    category: '',
    city: '', // Agregar el campo de ciudad
  });
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/hotels');
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  useEffect(() => {
    if (newHotel) {
      setHotels((prevHotels) => [...prevHotels, newHotel]);
    }
  }, [newHotel]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/hotels/${id}`);
      setHotels((prevHotels) => prevHotels.filter((hotel) => hotel._id !== id));
    } catch (error) {
      console.error('Error deleting hotel:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      date,
    }));
  };

  const filteredHotels = hotels.filter((hotel) => {
    return (
      (filters.name === '' || hotel.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.price === '' || hotel.price <= parseFloat(filters.price)) &&
      (filters.rooms === '' || hotel.rooms >= parseInt(filters.rooms)) &&
      (filters.category === '' || hotel.category === filters.category) &&
      (filters.city === '' || hotel.city === filters.city)
    );
  });

  const handleAddHotel = () => {
    setSelectedHotel(null);
    setShowModal(true);
  };

  const handleEditHotel = (hotel) => {
    setSelectedHotel(hotel);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedHotel(null);
  };

  const handleHotelSaved = (hotel) => {
    if (selectedHotel) {
      setHotels((prevHotels) =>
        prevHotels.map((h) => (h._id === hotel._id ? hotel : h))
      );
    } else {
      setHotels((prevHotels) => [...prevHotels, hotel]);
    }
    setShowModal(false);
  };

  const handleImageClick = (hotel) => {
    setSelectedHotel(hotel);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen p-6 gap-6 bg-lightGray">
      {/* Filters */}
      <div className="lg:w-1/4 w-full h-full bg-gradient-to-b from-white via-lightGray to-white text-black p-6 flex flex-col shadow-lg rounded-lg border border-gray-300">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink to-pink-light mb-6">
          Filtrar Hoteles
        </h2>
        <input
          type="text"
          name="name"
          placeholder="Filtrar por nombre"
          value={filters.name}
          onChange={handleFilterChange}
          className="bg-gray-200 text-black px-4 py-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-pink outline-none mb-4 w-full"
        />
        <input
          type="number"
          name="price"
          placeholder="Filtrar por precio máximo"
          value={filters.price}
          onChange={handleFilterChange}
          className="bg-gray-200 text-black px-4 py-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-pink outline-none mb-4 w-full"
        />
        <input
          type="number"
          name="rooms"
          placeholder="Filtrar por habitaciones mínimas"
          value={filters.rooms}
          onChange={handleFilterChange}
          className="bg-gray-200 text-black px-4 py-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-pink outline-none mb-4 w-full"
        />
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="bg-gray-200 text-black px-4 py-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-pink outline-none mb-4 w-full"
        >
          <option value="">Todas las categorías</option>
          <option value="playa">Playa</option>
          <option value="montaña">Montaña</option>
          <option value="finca">Finca</option>
          <option value="ciudad">Ciudad</option>
          <option value="pueblo">Pueblo</option>
        </select>
        <select
          name="city"
          value={filters.city}
          onChange={handleFilterChange}
          className="bg-gray-200 text-black px-4 py-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-pink outline-none mb-4 w-full"
        >
          <option value="">Todas las ciudades</option>
          <option value="San Andres">San Andres</option>
          <option value="Bogota">Bogota</option>
          <option value="Medellin">Medellin</option>
          <option value="Cali">Cali</option>
          <option value="Cartagena">Cartagena</option>
        </select>
        <DatePicker
          selected={filters.date}
          onChange={handleDateChange}
          placeholderText="Seleccionar fecha"
          className="bg-gray-200 text-black px-4 py-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-pink outline-none mb-4 w-full hover:ring-pink-light"
          calendarClassName="custom-calendar" // Clase personalizada
          dayClassName={(date) =>
            'text-gray-600 font-medium hover:bg-pink hover:text-white rounded-full transition duration-300'
          }
          popperPlacement="bottom-start"
        />
      </div>

      {/* Hotel List */}
      <div className="lg:w-3/4 w-full p-6 bg-white text-black overflow-y-auto shadow-lg rounded-lg border border-gray-300">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink to-pink-light">
            Hoteles Disponibles
          </h1>
          <button
            onClick={handleAddHotel}
            className="bg-gradient-to-r from-pink to-pink-light text-white px-6 py-3 rounded shadow-md hover:from-pink-light hover:to-pink hover:text-white transition-transform transform hover:scale-105 flex items-center"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Crear Hotel
          </button>
        </div>

        <div className="overflow-x-auto bg-gray-200 shadow-lg rounded-lg">
          <table className="w-full table-auto text-sm text-left text-gray-600">
            <thead className="bg-gradient-to-r from-gray-300 to-gray-200 text-gray-700">
              <tr>
                <th className="px-6 py-3">Imagen</th>
                <th className="px-6 py-3">Nombre</th>
                <th className="px-6 py-3">Ubicación</th>
                <th className="px-6 py-3">Habitaciones</th>
                <th className="px-6 py-3">Precio</th>
                <th className="px-6 py-3">Servicios</th>
                <th className="px-6 py-3">Categoría</th>
                <th className="px-6 py-3">Ciudad</th>
                <th className="px-6 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredHotels.map((hotel, index) => (
                <tr
                  key={hotel._id}
                  className={`border-b border-gray-300 ${index % 2 === 0 ? 'bg-lightGray' : 'bg-white'}`}
                >
                  <td className="px-6 py-3">
                    <img
                      src={`http://localhost:5001/${hotel.image}`}
                      alt={hotel.name}
                      className="h-16 w-16 rounded-lg object-cover cursor-pointer"
                      onClick={() => handleImageClick(hotel)}
                    />
                  </td>
                  <td className="px-6 py-3 text-black font-medium">{hotel.name}</td>
                  <td className="px-6 py-3 text-gray-600">{hotel.location}</td>
                  <td className="px-6 py-3 text-gray-600">{hotel.rooms}</td>
                  <td className="px-6 py-3 text-pink font-bold">${hotel.price}</td>
                  <td className="px-6 py-3 text-gray-600">
                    {hotel.amenities.join(', ')}
                  </td>
                  <td className="px-6 py-3 text-gray-600">{hotel.category}</td>
                  <td className="px-6 py-3 text-gray-600">{hotel.city}</td>
                  <td className="px-6 py-3 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <StyledWrapper>
                        <button
                          onClick={() => handleEditHotel(hotel)}
                          className="edit-button"
                        >
                          <svg className="edit-svgIcon" viewBox="0 0 512 512">
                            <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
                          </svg>
                        </button>
                      </StyledWrapper>
                      <button
                        onClick={() => handleDelete(hotel._id)}
                        className="group relative flex h-14 w-14 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-red-800 bg-red-400 hover:bg-red-600"
                      >
                        <svg viewBox="0 0 1.625 1.625" className="absolute -top-7 fill-white delay-100 group-hover:top-6 group-hover:animate-[spin_1.4s] group-hover:duration-1000" height={15} width={15}>
                          <path d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195" />
                          <path d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033" />
                          <path d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016" />
                        </svg>
                        <svg width={16} fill="none" viewBox="0 0 39 7" className="origin-right duration-500 group-hover:rotate-90">
                          <line strokeWidth={4} stroke="white" y2={5} x2={39} y1={5} />
                          <line strokeWidth={3} stroke="white" y2="1.5" x2="26.0357" y1="1.5" x1={12} />
                        </svg>
                        <svg width={16} fill="none" viewBox="0 0 33 39" className>
                          <mask fill="white" id="path-1-inside-1_8_19">
                            <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z" />
                          </mask>
                          <path mask="url(#path-1-inside-1_8_19)" fill="white" d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z" />
                          <path strokeWidth={4} stroke="white" d="M12 6L12 29" />
                          <path strokeWidth={4} stroke="white" d="M21 6V29" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredHotels.length === 0 && (
            <p className="text-center text-gray-600 py-6">No hay hoteles disponibles</p>
          )}
        </div>
      </div>

      <Modal show={showModal} onClose={handleCloseModal}>
        {selectedHotel ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">{selectedHotel.name}</h2>
            <p><strong>Ubicación:</strong> {selectedHotel.location}</p>
            <p><strong>Habitaciones:</strong> {selectedHotel.rooms}</p>
            <p><strong>Precio:</strong> ${selectedHotel.price}</p>
            <p><strong>Servicios:</strong> {selectedHotel.amenities.join(', ')}</p>
            <p><strong>Descripción:</strong> {selectedHotel.descripcion}</p>
            <p><strong>Categoría:</strong> {selectedHotel.category}</p>
            <p><strong>Ciudad:</strong> {selectedHotel.city}</p>
          </div>
        ) : (
          <CreateHotel onClose={handleCloseModal} onHotelSaved={handleHotelSaved} />
        )}
      </Modal>
    </div>
  );
};

const StyledWrapper = styled.div`
  .edit-button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgb(20, 20, 20);
    border: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
    cursor: pointer;
    transition-duration: 0.3s;
    overflow: hidden;
    position: relative;
    text-decoration: none !important;
  }

  .edit-svgIcon {
    width: 17px;
    transition-duration: 0.3s;
  }

  .edit-svgIcon path {
    fill: white;
  }

  .edit-button:hover {
    width: 120px;
    border-radius: 50px;
    transition-duration: 0.3s;
    background-color: rgb(255, 69, 69);
    align-items: center;
  }

  .edit-button:hover .edit-svgIcon {
    width: 20px;
    transition-duration: 0.3s;
    transform: translateY(60%);
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }

  .edit-button::before {
    display: none;
    content: "Editar";
    color: white;
    transition-duration: 0.3s;
    font-size: 2px;
  }

  .edit-button:hover::before {
    display: block;
    padding-right: 10px;
    font-size: 13px;
    opacity: 1;
    transform: translateY(0px);
    transition-duration: 0.3s;
  }
`;

export default HotelList;