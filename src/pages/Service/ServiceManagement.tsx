// pages/Service/ServiceManagement.tsx

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

  useEffect(() => {
    fetchServicos();
  }, []);

  const fetchServicos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/servico`);
      setServicos(response.data);
    } catch (error) {
      setErrorMessage("Erro ao carregar serviços.");
      setTimeout(() => setErrorMessage(""), 3000); // Limpa a mensagem após 3 segundos
    }
  };

  const addServico = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
    if (!nome || !preco) {
      setErrorMessage("Por favor, preencha todos os campos.");
      setTimeout(() => setErrorMessage(""), 3000); // Limpa a mensagem após 3 segundos
      return;
    }

    const precoNum = parseFloat(preco);
    if (isNaN(precoNum) || precoNum <= 0) {
      setErrorMessage("Por favor, insira um preço válido.");
      setTimeout(() => setErrorMessage(""), 3000); // Limpa a mensagem após 3 segundos
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/servico`, { nome, preco: precoNum });
      fetchServicos();
      setNome("");
      setPreco("");
      setErrorMessage("");
    } catch (error: any) {
      setErrorMessage(error.response?.data || "Erro ao adicionar serviço.");
      setTimeout(() => setErrorMessage(""), 3000); // Limpa a mensagem após 3 segundos
    }
  };

  const deleteServico = async (nome: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/servico/${nome}`);
      fetchServicos();
    } catch (error) {
      setErrorMessage("Erro ao deletar serviço.");
      setTimeout(() => setErrorMessage(""), 3000); // Limpa a mensagem após 3 segundos
    }
  };

  const updateServico = async (nome: string, novoNome: string, novoPreco: number) => {
    try {
      await axios.put(`${API_BASE_URL}/servico/${nome}`, { nome: novoNome, preco: novoPreco });
      fetchServicos();
    } catch (error) {
      setErrorMessage("Erro ao atualizar serviço.");
      setTimeout(() => setErrorMessage(""), 3000); // Limpa a mensagem após 3 segundos
    }
  };

  return (
    <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gerenciamento de Serviços</h2>
      
      <form onSubmit={addServico} className="w-full space-y-4">
        <div>
          <label htmlFor="nome" className="block text-gray-600 font-semibold mb-2">
            Nome do Serviço
          </label>
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
          <label htmlFor="preco" className="block text-gray-600 font-semibold mb-2">
            Preço do Serviço
          </label>
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
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Adicionar Serviço
        </button>
      </form>

      <ul className="space-y-2 mt-4 w-full">
        {servicos.map((servico) => (
          <li key={servico.id} className="flex justify-between items-center p-2 border-b">
            <span>{servico.nome} - R$ {servico.preco.toFixed(2)}</span>
            <div className="space-x-2">
              <button
                onClick={() => updateServico(servico.nome, servico.nome, servico.preco)}
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
    </div>
  );
};

export default ServiceManagement;
