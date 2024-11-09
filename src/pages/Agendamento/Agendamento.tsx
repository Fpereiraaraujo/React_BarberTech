import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Agenda {
  id: string;
  nome: string;
  clienteNome: string;
  dataAgendamento: string;
  horaAgendamento: string;
  servicoConcluido: boolean;
}

const Agendamento: React.FC = () => {
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [nome, setNome] = useState<string>('');
  const [clienteNome, setClienteNome] = useState<string>('');
  const [dataAgendamento, setDataAgendamento] = useState<string>('');
  const [horaAgendamento, setHoraAgendamento] = useState<string>('');
  const [editingAgenda, setEditingAgenda] = useState<Agenda | null>(null); // State for editing an agenda
  const [filter, setFilter] = useState<string>('');
  const [showList, setShowList] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false); // State for status (false = Aguardando, true = Concluído)

  const handleAddAgenda = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<Agenda>('https://localhost:5400/agenda', {
        Nome: nome,
        ClienteNome: clienteNome,
        DataAgendamento: dataAgendamento,
        HoraAgendamento: horaAgendamento,
        ServicoConcluido: false, // Inicializa como falso no cadastro
      });
      setAgendas([...agendas, response.data]);
      setNome('');
      setClienteNome('');
      setDataAgendamento('');
      setHoraAgendamento('');
      setError('');
    } catch (err) {
      setError('Erro ao adicionar agendamento. Verifique os dados.');
      console.error(err);
    }
  };

  const handleListAgendas = async () => {
    try {
      const response = await axios.get<Agenda[]>('https://localhost:5400/agenda');
      setAgendas(response.data);
      setShowList(true);
    } catch (err) {
      setError('Erro ao carregar agendamentos.');
      console.error(err);
    }
  };

  const handleDeleteAgenda = async (id: string) => {
    try {
      await axios.delete(`https://localhost:5400/agenda/${id}`);
      setAgendas(agendas.filter(agenda => agenda.id !== id));
    } catch (err) {
      setError('Erro ao deletar agendamento.');
      console.error(err);
    }
  };

  const handleEditAgenda = (agenda: Agenda) => {
    setEditingAgenda(agenda);
    setNome(agenda.nome);
    setClienteNome(agenda.clienteNome);
    setDataAgendamento(agenda.dataAgendamento);
    setHoraAgendamento(agenda.horaAgendamento);
    setStatus(agenda.servicoConcluido); // Set status based on the current agenda status
  };

  const handleUpdateAgenda = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingAgenda) return;

    try {
      const response = await axios.put<Agenda>(`https://localhost:5400/agenda/${editingAgenda.id}`, {
        Nome: nome,
        ClienteNome: clienteNome,
        DataAgendamento: dataAgendamento,
        HoraAgendamento: horaAgendamento,
        ServicoConcluido: status, // Update with the selected status
      });

      setAgendas(agendas.map(agenda =>
        agenda.id === editingAgenda.id ? response.data : agenda
      ));
      setEditingAgenda(null); // Clear editing state
      setNome('');
      setClienteNome('');
      setDataAgendamento('');
      setHoraAgendamento('');
      setError('');
    } catch (err) {
      setError('Erro ao atualizar agendamento.');
      console.error(err);
    }
  };

  const filteredAgendas = agendas.filter(agenda =>
    agenda.clienteNome.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-white mb-6">Gerenciamento de Agendamentos</h2>

      {/* Formulário de agendamento */}
      <form onSubmit={editingAgenda ? handleUpdateAgenda : handleAddAgenda} className="w-full space-y-4 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label htmlFor="nome" className="block text-gray-600 font-semibold mb-2">
            Nome do Barbeiro
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Digite o nome do barbeiro"
            required
          />
        </div>

        <div>
          <label htmlFor="clienteNome" className="block text-gray-600 font-semibold mb-2">
            Nome do Cliente
          </label>
          <input
            type="text"
            id="clienteNome"
            value={clienteNome}
            onChange={(e) => setClienteNome(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Digite o nome do cliente"
            required
          />
        </div>

        <div>
          <label htmlFor="dataAgendamento" className="block text-gray-600 font-semibold mb-2">
            Data do Agendamento
          </label>
          <input
            type="date"
            id="dataAgendamento"
            value={dataAgendamento}
            onChange={(e) => setDataAgendamento(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="horaAgendamento" className="block text-gray-600 font-semibold mb-2">
            Hora do Agendamento
          </label>
          <input
  type="time"
  id="horaAgendamento"
  value={horaAgendamento} // 'HH:mm' (sem os segundos)
  onChange={(e) => setHoraAgendamento(e.target.value + ":00")} // Adiciona os segundos automaticamente
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
/>

        </div>

        {/* Exibir o campo de status apenas quando estiver editando */}
        {editingAgenda && (
          <div>
            <label htmlFor="status" className="block text-gray-600 font-semibold mb-2">
              Status do Agendamento
            </label>
            <select
              id="status"
              value={status ? 'Concluído' : 'Aguardando'}
              onChange={(e) => setStatus(e.target.value === 'Concluído')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="Aguardando">Aguardando</option>
              <option value="Concluído">Concluído</option>
            </select>
          </div>
        )}

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {editingAgenda ? 'Atualizar Agendamento' : 'Adicionar Agendamento'}
        </button>
      </form>

      <button
        onClick={handleListAgendas}
        className="mt-4 w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
      >
        Listar Agendamentos
      </button>

      {showList && (
        <>
          <input
            type="text"
            placeholder="Filtrar pelo nome do cliente"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={() => setShowList(false)}
            className="mt-2 w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition"
          >
            Esconder Lista
          </button>
        </>
      )}

      {showList && (
        <div className="mt-6 w-full">
          <h3 className="text-xl font-bold text-white mb-4">Lista de Agendamentos</h3>
          <ul className="bg-white rounded-lg shadow-md p-4">
            {filteredAgendas.map((agenda) => (
              <li key={agenda.id} className="flex justify-between items-center border-b py-2">
                <div className="flex flex-col">
                  <span className="text-gray-800">
                    Cliente: {agenda.clienteNome}
                  </span>
                  <span className="text-gray-600 text-sm">
                    Data: {agenda.dataAgendamento} às {agenda.horaAgendamento}
                  </span>
                  <span className="text-gray-600 text-sm">
                    Status: {agenda.servicoConcluido ? 'Concluído' : 'Aguardando'}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditAgenda(agenda)}
                    className="bg-yellow-500 text-white font-semibold py-1 px-3 rounded-lg hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteAgenda(agenda.id)}
                    className="bg-red-500 text-white font-semibold py-1 px-3 rounded-lg hover:bg-red-600"
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

export default Agendamento;
