// src/RocketsInActivityTable.js
import React, { useEffect, useState } from "react";
import "../style.css";
import axios from "axios";

const RocketsInActivityTable = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Função para buscar os dados do endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/rockets-in-activity"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Rockets in Activity</th>
          <th>Rockets Out of Activity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{data.Foguetes_Em_Atividade}</td>
          <td>{data.Foguetes_Nao_Em_Atividade}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default RocketsInActivityTable;
