import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ClientSignup = () => {
  const navigate = useNavigate();

  const handleSignup = (e:any) => {
    e.preventDefault();
    // Lógica para criação de conta aqui
    navigate('/client-dashboard'); // Redireciona para o dashboard do cliente após o registro
  };

  const handleLoginRedirect = () => {
    navigate('/client-login'); // Redireciona para a tela de login
  };

  return (
    <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Criação de Conta</h2>

      <form onSubmit={handleSignup} className="w-full space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-600 font-semibold mb-2">
            Nome Completo
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Digite seu nome completo"
            required
          />
        </div>
        
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
        
        <div>
          <label htmlFor="confirmPassword" className="block text-gray-600 font-semibold mb-2">
            Confirmar Senha
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Confirme sua senha"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Criar Conta
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">Já tem uma conta?</p>
        <button
          onClick={handleLoginRedirect}
          className="mt-2 text-blue-600 font-semibold hover:underline"
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

export default ClientSignup;
