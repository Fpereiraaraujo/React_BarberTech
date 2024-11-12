import React, { useEffect, useState } from "react";
import axios from "axios";

type Servico = {
  id: string;
  nome: string;
  preco: number;
};

const API_BASE_URL = "https://localhost:5400";

const ServiceManagement: React.FC = () => {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showList, setShowList] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [servicoEditado, setServicoEditado] = useState<Servico | null>(null);

  const fetchServicos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/servico`);
      setServicos(response.data);
      setShowList(true);
    } catch (error) {
      setErrorMessage("Erro ao carregar serviços.");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const addServico = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !preco) {
      setErrorMessage("Por favor, preencha todos os campos.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    const precoNum = parseFloat(preco);
    if (isNaN(precoNum) || precoNum <= 0) {
      setErrorMessage("Por favor, insira um preço válido.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/servico`, { nome, preco: precoNum });
      fetchServicos();
      setNome("");
      setPreco("");
    } catch (error: any) {
      setErrorMessage(error.response?.data || "Erro ao adicionar serviço.");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const deleteServico = async (nome: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/servico/${nome}`);
      fetchServicos();
    } catch (error) {
      setErrorMessage("Erro ao deletar serviço.");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const openEditForm = (servico: Servico) => {
    setIsEditing(true);
    setServicoEditado(servico);
    setNome(servico.nome);
    setPreco(servico.preco.toString());
  };

  const saveEditServico = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !preco) {
      setErrorMessage("Por favor, preencha todos os campos.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    const precoNum = parseFloat(preco);
    if (isNaN(precoNum) || precoNum <= 0) {
      setErrorMessage("Por favor, insira um preço válido.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    try {
      await axios.put(`${API_BASE_URL}/servico/${servicoEditado?.nome}`, {
        nome,
        preco: precoNum,
      });
      fetchServicos();
      setIsEditing(false);
      setServicoEditado(null);
      setNome("");
      setPreco("");
    } catch (error) {
      setErrorMessage("Erro ao atualizar serviço.");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gerenciamento de Serviços</h2>

      {isEditing ? (
        <form onSubmit={saveEditServico} className="w-full space-y-4">
          <div>
            <label htmlFor="nome" className="block text-gray-600 font-semibold mb-2">Nome do Serviço</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Digite o nome do serviço"
              required
            />
          </div>

          <div>
            <label htmlFor="preco" className="block text-gray-600 font-semibold mb-2">Preço do Serviço</label>
            <input
              type="number"
              id="preco"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Digite o preço do serviço"
              required
            />
          </div>

          {errorMessage && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>}

          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">
            Salvar Alterações
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="w-full bg-gray-500 text-white font-semibold py-2 rounded-lg hover:bg-gray-600 transition mt-2"
          >
            Cancelar
          </button>
        </form>
      ) : (
        <form onSubmit={addServico} className="w-full space-y-4">
          <div>
            <label htmlFor="nome" className="block text-gray-600 font-semibold mb-2">Nome do Serviço</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Digite o nome do serviço"
              required
            />
          </div>

          <div>
            <label htmlFor="preco" className="block text-gray-600 font-semibold mb-2">Preço do Serviço</label>
            <input
              type="number"
              id="preco"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Digite o preço do serviço"
              required
            />
          </div>

          {errorMessage && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>}

          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">
            Adicionar Serviço
          </button>
        </form>
      )}

      {showList ? (
        <button
          onClick={() => setShowList(false)}
          className="mt-4 w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition"
        >
          Esconder Lista
        </button>
      ) : (
        <button
          onClick={fetchServicos}
          className="mt-4 w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
        >
          Listar Serviços
        </button>
      )}

      {showList && (
        <ul className="space-y-2 mt-4 w-full">
          {servicos.map((servico) => (
            <li key={servico.id} className="flex justify-between items-center p-2 border-b">
              <span>{servico.nome} - R$ {servico.preco.toFixed(2)}</span>
              <div className="space-x-2">
                <button
                  onClick={() => openEditForm(servico)}
                  className="text-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteServico(servico.nome)}
                  className="text-red-600"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServiceManagement;
