import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import HotelList from './components/HotelList';
import HotelOverview from './components/HotelOverview';
import HotelDetails from './components/HotelDetails';
import CreateHotel from './components/CreateHotel';
import Auth from './components/Auth';
import Header from './components/Header';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [newHotel, setNewHotel] = useState(null);

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
  };

  const handleHotelSaved = (hotel) => {
    setNewHotel(hotel);
  };

  return (
    <Router>
      <AppContent
        showModal={showModal}
        selectedHotel={selectedHotel}
        newHotel={newHotel}
        handleAddHotel={handleAddHotel}
        handleEditHotel={handleEditHotel}
        handleCloseModal={handleCloseModal}
        handleHotelSaved={handleHotelSaved}
      />
    </Router>
  );
}

const AppContent = ({ showModal, selectedHotel, newHotel, handleAddHotel, handleEditHotel, handleCloseModal, handleHotelSaved }) => {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/' && <Header onAddHotel={handleAddHotel} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/hotels" element={<HotelOverview newHotel={newHotel} />} />
        <Route path="/hotels/:hotelId" element={<HotelDetails />} />
        <Route path="/manage-hotels" element={<HotelList onAddHotel={handleAddHotel} onEditHotel={handleEditHotel} newHotel={newHotel} />} />
      </Routes>
      {showModal && <CreateHotel onClose={handleCloseModal} hotel={selectedHotel} onHotelSaved={handleHotelSaved} />}
    </div>
  );
};

export default App;
