// src/AverageCostTable.js
import React, { useEffect, useState } from "react";
import "../style.css";
import axios from "axios";

const AverageCostTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Função para buscar os dados do endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/average-cost");
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
          <th>Location</th>
          <th>Average Rocket Cost</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.localizacao}</td>
            <td>{item.media_custo_foguetes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AverageCostTable;
