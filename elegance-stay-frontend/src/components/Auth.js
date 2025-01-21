import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isForgotPassword) {
        await axios.post('http://localhost:5001/api/auth/forgot-password', { email: formData.email });
        alert('Password reset link sent to your email');
      } else if (isLogin) {
        const response = await axios.post('http://localhost:5001/api/auth/login', {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem('token', response.data.token);
        navigate('/hotels');
      } else {
        await axios.post('http://localhost:5001/api/auth/register', {
          email: formData.email,
          password: formData.password,
          name: formData.name,
        });
        alert('Registration successful');
        setIsLogin(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with waves */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{
          backgroundImage: 'url("https://source.unsplash.com/1600x900/?pastel,abstract")',
        }}></div>
      </div>
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none">
        <div className="absolute opacity-50 bg-gradient-to-r from-gray-400 to-gray-500 w-[200%] h-[200%] transform rotate-45 translate-y-[-60%] translate-x-[-20%] blur-3xl"></div>
      </div>
      
      <div className="relative z-10 bg-white/70 backdrop-blur-2xl p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-400">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-pink-500">
          {isForgotPassword ? 'Recuperar Contraseña' : isLogin ? 'Iniciar Sesión' : 'Registro de Usuario'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && !isForgotPassword && (
            <div>
              <label className="block text-gray-700 font-semibold">Nombre:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-400 bg-transparent text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          )}
          <div>
            <label className="block text-gray-700 font-semibold">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-400 bg-transparent text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          {!isForgotPassword && (
            <div>
              <label className="block text-gray-700 font-semibold">Contraseña:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-400 bg-transparent text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          )}
          {!isLogin && !isForgotPassword && (
            <div>
              <label className="block text-gray-700 font-semibold">Confirmar Contraseña:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-400 bg-transparent text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-pink-500 text-white font-bold rounded-lg shadow-lg hover:bg-pink-600 transition duration-300"
          >
            {isForgotPassword ? 'Enviar Enlace de Recuperación' : isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>
        <div className="mt-6 text-center">
          {isForgotPassword ? (
            <button
              onClick={() => setIsForgotPassword(false)}
              className="text-pink-500 hover:text-pink-600 transition duration-300"
            >
              Volver a Iniciar Sesión
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsForgotPassword(true)}
                className="text-pink-500 hover:text-pink-600 transition duration-300"
              >
                ¿Olvidaste tu contraseña?
              </button>
              <br />
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-pink-500 hover:text-pink-600 transition duration-300"
              >
                {isLogin ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia Sesión'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
