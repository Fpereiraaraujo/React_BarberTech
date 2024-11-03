import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BarberLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e:any) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:5400/login', {
        Username: username,
        Password: password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token); // Salva o token no localStorage
        navigate('/barber-dashboard'); // Redireciona para o dashboard do barbeiro
      }
    } catch (err) {
      setError('Nome de usuário ou senha incorretos');
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Login do Barbeiro</h2>
      
      <form onSubmit={handleLogin} className="w-full space-y-4">
        <div>
          <label htmlFor="username" className="block text-gray-600 font-semibold mb-2">
            Nome de Usuário
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Digite seu nome de usuário"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-gray-600 font-semibold mb-2">
            Senha
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Digite sua senha"
            required
          />
        </div>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default BarberLogin;
