// pages/Service/ServiceManagement.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";

type Servico = {
  id: string;
  nome: string;
  preco: number;
};

const API_BASE_URL = "http://localhost:5400";

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
    }
  };

  const addServico = async () => {
    try {
      await axios.post(`${API_BASE_URL}/servico`, { nome, preco: parseFloat(preco) });
      fetchServicos();
      setNome("");
      setPreco("");
      setErrorMessage("");
    } catch (error: any) {
      setErrorMessage(error.response?.data || "Erro ao adicionar serviço.");
    }
  };

  const deleteServico = async (nome: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/servico/${nome}`);
      fetchServicos();
    } catch (error) {
      setErrorMessage("Erro ao deletar serviço.");
    }
  };

  const updateServico = async (nome: string, novoNome: string, novoPreco: number) => {
    try {
      await axios.put(`${API_BASE_URL}/servico/${nome}`, { nome: novoNome, preco: novoPreco });
      fetchServicos();
    } catch (error) {
      setErrorMessage("Erro ao atualizar serviço.");
    }
  };

  return (
    <div className="w-full max-w-lg p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Gerenciamento de Serviços</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Nome do Serviço"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border px-2 py-1 w-full mb-2"
        />
        <input
          type="number"
          placeholder="Preço do Serviço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          className="border px-2 py-1 w-full"
        />
        <button
          onClick={addServico}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2 w-full"
        >
          Adicionar Serviço
        </button>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>

      <ul className="space-y-2">
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
