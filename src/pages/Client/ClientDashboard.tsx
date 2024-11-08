import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Client{
  id: string;
  nome: string;
  email: string;
  telefone: string;
}

const ClientDashboard: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [showList, setShowList] = useState<boolean>(false); 
  const [, setError] = useState<string>('');
  const [filter, setFilter] = useState<string>(''); 
  
  const handleListClients = async () => {
    try {
      const response = await axios.get<Client[]>('https://localhost:5400/cliente');
      setClients(response.data);
      setShowList(true); // Mostra a lista após buscar
    } catch (err) {
      setError('Erro ao carregar clientes');
      console.error(err);
    }
  };

  const filteredClient = clients.filter(client =>
    client.nome.toLowerCase().includes(filter.toLowerCase())
  );

  const navigate = useNavigate();
  const handleSignupRedirect = () => {
    navigate('/client-signup');
  };

  const handleDeleteClient = async (nome: string) => {
    try {
      await axios.delete(`https://localhost:5400/cliente/${nome}`);
      setClients(clients.filter(client => client.nome !== nome));
    } catch (err) {
      setError('Erro ao deletar cliente');
      console.error(err);
    }
  };


  return (
    <div className='"flex flex-col items-center bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto mt-10"'>
      <h2 className="text-2xl font-bold text-white mb-6">Bem-vindo, admin!</h2>
      <div className="w-full space-y-4 bg-white p-6 rounded-lg shadow-md">

      <button
        onClick={handleListClients}
        className="mt-4 w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Listar clientes
      </button>
      {showList && (
        <>
          <input
            type="text"
            placeholder="Filtrar pelo nome"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={() => setShowList(false)} // Ocultar a lista
            className="mt-2 w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition"
          >
            Esconder Lista
          </button>
        </>
      )}

      {showList && (
        <div className="mt-6 w-full">
          <h3 className="text-xl font-bold text-black mb-4">Lista de Clientes</h3>
          <ul className="bg-white rounded-lg shadow-md p-4">
            {filteredClient.map((client) => (
              <li key={client.id} className="flex justify-between items-center border-b py-2">
                <span className="text-gray-800">{client.nome} <br/> {client.email}</span>
                <button
                  onClick={() => handleDeleteClient(client.nome)} // Passando o nome
                  className="text-red-600 hover:text-red-800 transition"
                >
                  Deletar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

        <div className="mt-6 text-center">
          <button
            onClick={handleSignupRedirect}
            className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
          >
            Cadastrar cliente
          </button>
        </div>

      </div>
    </div>
  );
};

export default ClientDashboard;
