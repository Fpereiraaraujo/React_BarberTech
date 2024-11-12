import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

// Definindo o tipo de um barbeiro
interface Barber {
  id: number;
  nome: string;
  especialidade: string;
}

const BarberManagement: React.FC = () => {
  const [barbers, setBarbers] = useState<Barber[]>([]); // Lista de barbeiros
  const [name, setName] = useState<string>(''); // Nome do barbeiro
  const [specialty, setSpecialty] = useState<string>(''); // Especialidade
  const [password, setPassword] = useState<string>(''); // Senha
  const [filter, setFilter] = useState<string>(''); // Filtro para listar
  const [showList, setShowList] = useState<boolean>(false); // Exibir lista
  const [error, setError] = useState<string>(''); // Mensagem de erro
  const [editMode, setEditMode] = useState<boolean>(false); // Para controle do modo de edição
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null); // Barbeiro selecionado para edição

  // Função para adicionar barbeiro
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

  // Função para listar barbeiros
  const handleListBarbers = async () => {
    try {
      const response = await axios.get<Barber[]>('https://localhost:5400/barbeiro');
      setBarbers(response.data);
      setShowList(true);
    } catch (err) {
      setError('Erro ao carregar barbeiros');
      console.error(err);
    }
  };

  // Função para deletar barbeiro
  const handleDeleteBarber = async (nome: string) => {
    try {
      await axios.delete(`https://localhost:5400/barbeiro/${nome}`);
      setBarbers(barbers.filter(barber => barber.nome !== nome));
    } catch (err) {
      setError('Erro ao deletar barbeiro');
      console.error(err);
    }
  };

  // Função para atualizar barbeiro
  const handleUpdateBarber = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedBarber) return; // Se não houver barbeiro selecionado, não faz nada

    try {
      const response = await axios.put<Barber>(`https://localhost:5400/barbeiro/${selectedBarber.nome}`, {
        Nome: name,
        Especialidade: specialty,
        Senha: password,
      });

      setBarbers(barbers.map(barber =>
        barber.id === response.data.id ? response.data : barber
      ));

      setName('');
      setSpecialty('');
      setPassword('');
      setEditMode(false); // Desativando o modo de edição
      setSelectedBarber(null); // Limpa o barbeiro selecionado
      setError('');
    } catch (err) {
      console.error('Erro ao atualizar barbeiro:', err);

      // Verifica se o erro é do tipo AxiosError
      if (err instanceof AxiosError) {
        if (err.response) {
          // Caso a resposta da API contenha um erro
          setError(`Erro ao atualizar barbeiro: ${err.response.data || err.response.statusText}`);
        } else {
          // Caso não haja resposta da API
          setError('Erro ao atualizar barbeiro. Sem resposta da API.');
        }
      } else {
        // Caso o erro não seja do tipo AxiosError
        setError('Erro ao atualizar barbeiro. Verifique os dados.');
      }
    }
  };

  // Função para preencher os campos de edição
  const handleEditBarber = (barber: Barber) => {
    setName(barber.nome);
    setSpecialty(barber.especialidade);
    setPassword(''); // Senha não é obrigatória para edição
    setSelectedBarber(barber); // Define o barbeiro a ser editado
    setEditMode(true); // Ativa o modo de edição
  };

  // Filtrar os barbeiros
  const filteredBarbers = barbers.filter(barber =>
    barber.nome.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    if (name || specialty || password) {
      setError(''); // Limpa o erro quando o usuário digitar
    }
  }, [name, specialty, password]);

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-white mb-6">Gerenciamento de Barbeiros</h2>

      {/* Formulário de Adicionar ou Editar */}
      <form onSubmit={editMode ? handleUpdateBarber : handleAddBarber} className="w-full space-y-4 bg-white p-6 rounded-lg shadow-md">
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
          />
        </div>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {editMode ? 'Atualizar Barbeiro' : 'Adicionar Barbeiro'}
        </button>
      </form>

      {/* Listagem de barbeiros */}
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
            onClick={() => setShowList(false)} // Esconder a lista
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
                <div>
                  <button
                    onClick={() => handleEditBarber(barber)} // Edita o barbeiro
                    className="text-blue-600 hover:text-blue-800 transition mx-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteBarber(barber.nome)} // Deleta o barbeiro
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    Deletar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BarberManagement;
