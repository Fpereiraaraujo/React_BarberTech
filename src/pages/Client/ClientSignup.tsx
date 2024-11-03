import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ClientSignup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telefone, setTelefone] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e:any) => {
    e.preventDefault();
    
    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      const response = await axios.post('https://localhost:5400/register', {
        Nome: name,
        Senha: password,
        Telefone: telefone,
        Email: email,
      });

      if (response.status === 200) {
        navigate('/client-dashboard'); // Redireciona para o dashboard do cliente após o registro
      }
    } catch (err) {
      setError('Erro ao criar conta. Verifique os dados e tente novamente.');
      console.error(err);
    }
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Digite seu nome completo"
            required
          />
        </div>

        <div>
          <label htmlFor="telefone" className="block text-gray-600 font-semibold mb-2">
            Telefone
          </label>
          <input
            type="text"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Digite seu telefone"
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Confirme sua senha"
            required
          />
        </div>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        
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
