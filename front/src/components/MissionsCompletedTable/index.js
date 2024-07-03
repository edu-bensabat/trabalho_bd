// src/MissionsCompletedTable.js
import React, { useEffect, useState } from "react";
import "../style.css";
import axios from "axios";

const MissionsCompletedTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Função para buscar os dados do endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/missions-completed"
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
          <th>Company</th>
          <th>Completed Missions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.nome}</td>
            <td>{item.missao_completadas}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MissionsCompletedTable;
