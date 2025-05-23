import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsAnimating(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setIsAnimating(false);
      return;
    }

    try {
      const response = await fetch('http://18.211.74.2:3000/v1/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password_hash: password,
          full_name: fullName
        }),
      });

      if (response.status === 201) {
        
        
        if (response) {
          navigate('/login');
        } else {
          navigate('/');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al registrar el usuario');
      }
    } catch (error) {
      setError('Error de conexión. Por favor intenta de nuevo.');
      console.error('Registration error:', error);
    } finally {
      setIsAnimating(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full">
      
      <div className="absolute inset-0 bg-cover bg-center" style={{ 
        backgroundImage: 'url(/wallpaperMiko.jpg)', 
        filter: 'brightness(40%)' 
      }}></div>
      
        <div className="absolute inset-0 bg-black opacity-60"></div>
      
      <div className={`relative z-10 bg-black bg-opacity-75 rounded-md overflow-hidden w-full max-w-md p-16 transform transition-all duration-500 border border-gray-800 ${isAnimating ? 'scale-105' : 'scale-100'}`}>
        <div className="mb-8">
          <h1 className="font-bold text-3xl text-white mb-6">Crear cuenta</h1>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-900 bg-opacity-50 text-red-200 rounded text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleRegister} className="space-y-6 flex flex-col gap-6">
          <div>
            <input
              id="fullName"
              type="text"
              className="form-input w-full px-5 py-4 bg-gray-800 text-gray-200 rounded text-base focus:ring-1 focus:ring-red-600 focus:outline-none placeholder-gray-500 border-none"
              placeholder="Nombre completo"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          
          <div>
            <input
              id="email"
              type="email"
              className="form-input w-full px-5 py-4 bg-gray-800 text-gray-200 rounded text-base focus:ring-1 focus:ring-red-600 focus:outline-none placeholder-gray-500 border-none"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="form-input w-full px-5 py-4 bg-gray-800 text-gray-200 rounded text-base focus:ring-1 focus:ring-red-600 focus:outline-none placeholder-gray-500 border-none pr-12"
                placeholder="Contraseña"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>
          
          <div>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="form-input w-full px-5 py-4 bg-gray-800 text-gray-200 rounded text-base focus:ring-1 focus:ring-red-600 focus:outline-none placeholder-gray-500 border-none pr-12"
                placeholder="Confirmar contraseña"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-200"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              className={`w-full flex justify-center items-center px-4 py-3 bg-blue-800 text-white font-medium rounded hover:bg-blue-700 focus:outline-none transform transition-all duration-300 ${
                isAnimating ? 'scale-95 bg-blue-700' : ''
              }`}
            >
              {isAnimating ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registrando...
                </div>
              ) : (
                <div className="flex items-center">
                  Registrarse
                </div>
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-8">
          <p className="text-gray-500 mb-4">
            ¿Estás registrado? <a href="/login" className="text-white hover:underline">Inicia sesión</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;