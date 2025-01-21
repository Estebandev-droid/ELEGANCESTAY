import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/hotels');
  };

  const handleLogin = () => {
    navigate('/auth');
  };

  return (
    <div
      className="relative h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/images/fondo.jpg')" }}
    >
      {/* Overlay oscuro para realzar contenido */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>

      {/* Contenido principal */}
      <div className="relative z-10 text-center text-white px-6 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Bienvenido a <span className="text-pink-500">EleganceStay</span>
        </h1>
        <p className="text-lg md:text-2xl font-bold text-white mb-8">
          Explora destinos increíbles y encuentra hoteles que se adaptan a tus necesidades. Planifica tus vacaciones o viajes de negocios con comodidad y estilo.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleStart}
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold text-lg py-3 px-8 rounded-lg shadow-lg hover:shadow-pink-500/50 transition-all duration-300 transform hover:-translate-y-1"
          >
            Comenzar tu aventura
          </button>
          <button
            onClick={handleLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-3 px-8 rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-1"
          >
            Login
          </button>
        </div>
      </div>

      {/* Elementos decorativos */}
      <div className="absolute bottom-5 left-5 text-white text-sm md:text-base font-medium">
        🌍 Descubre el mundo con nosotros
      </div>
    </div>
  );
};

export default Home;
