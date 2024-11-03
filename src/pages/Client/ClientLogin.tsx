import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClientLogin: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de autenticação para o cliente aqui
    navigate('/client-dashboard');
  };

  const handleSignupRedirect = () => {
    navigate('/client-signup');
  };

  return (
    <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Login do Cliente</h2>
      
      <form onSubmit={handleLogin} className="w-full space-y-4">
        <div>
          <label htmlFor="email" className="block text-gray-600 font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Digite seu email"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Digite sua senha"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Entrar
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">Não tem uma conta?</p>
        <button
          onClick={handleSignupRedirect}
          className="mt-2 text-blue-600 font-semibold hover:underline"
        >
          Criar Conta
        </button>
      </div>
    </div>
  );
};

export default ClientLogin;
