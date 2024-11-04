import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Barber {
  id: number;
  nome: string;
  especialidade: string;
}

const BarberManagement: React.FC = () => {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [name, setName] = useState<string>('');
  const [specialty, setSpecialty] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [filter, setFilter] = useState<string>(''); 
  const [showList, setShowList] = useState<boolean>(false); 
  const [error, setError] = useState<string>('');

  const handleAddBarber = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post<Barber>('https://localhost:5400/barbeiro', {
        Nome: name,
        Especialidade: specialty,
        Senha: password,
      });

      setBarbers([...barbers, response.data]);
      setName('');
      setSpecialty('');
      setPassword('');
      setError('');
    } catch (err) {
      setError('Erro ao adicionar barbeiro. Verifique os dados.');
      console.error(err);
    }
  };

  const handleListBarbers = async () => {
    try {
      const response = await axios.get<Barber[]>('https://localhost:5400/barbeiro');
      setBarbers(response.data);
      setShowList(true); // Mostra a lista após buscar
    } catch (err) {
      setError('Erro ao carregar barbeiros');
      console.error(err);
    }
  };

  const handleDeleteBarber = async (nome: string) => {
    try {
      await axios.delete(`https://localhost:5400/barbeiro/${nome}`);
      setBarbers(barbers.filter(barber => barber.nome !== nome));
    } catch (err) {
      setError('Erro ao deletar barbeiro');
      console.error(err);
    }
  };

  const filteredBarbers = barbers.filter(barber =>
    barber.nome.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    if (name || specialty || password) {
      setError('');
    }
  }, [name, specialty, password]);

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-white mb-6">Gerenciamento de Barbeiros</h2>

      <form onSubmit={handleAddBarber} className="w-full space-y-4 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label htmlFor="name" className="block text-gray-600 font-semibold mb-2">
            Nome do Barbeiro
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Digite o nome do barbeiro"
            required
          />
        </div>

        <div>
          <label htmlFor="specialty" className="block text-gray-600 font-semibold mb-2">
            Especialidade
          </label>
          <input
            type="text"
            id="specialty"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Digite a especialidade do barbeiro"
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
            placeholder="Digite a senha"
            required
          />
        </div>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Adicionar Barbeiro
        </button>
      </form>

      <button
        onClick={handleListBarbers}
        className="mt-4 w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
      >
        Listar Barbeiros
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
          <h3 className="text-xl font-bold text-white mb-4">Lista de Barbeiros</h3>
          <ul className="bg-white rounded-lg shadow-md p-4">
            {filteredBarbers.map((barber) => (
              <li key={barber.id} className="flex justify-between items-center border-b py-2">
                <span className="text-gray-800">{barber.nome} - {barber.especialidade}</span>
                <button
                  onClick={() => handleDeleteBarber(barber.nome)} // Passando o nome
                  className="text-red-600 hover:text-red-800 transition"
                >
                  Deletar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BarberManagement;
