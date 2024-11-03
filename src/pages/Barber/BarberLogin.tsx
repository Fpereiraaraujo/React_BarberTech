import React from 'react';

const BarberLogin = () => {
  return (
    <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Login do Barbeiro</h2>
      
      <form className="w-full space-y-4">
        <div>
          <label htmlFor="username" className="block text-gray-600 font-semibold mb-2">
            Nome de Usuário
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Digite seu nome de usuário"
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
          />
        </div>
        
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
