// import React, { useEffect, useState } from "react";

// function CompaniesCountTable() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3000/companies-count")
//       .then((response) => response.json())
//       .then((data) => setData(data))
//       .catch((error) => console.error("Erro ao buscar dados:", error));
//   }, []);

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Localização</th>
//           <th>Quantidade de Companhias</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item, index) => (
//           <tr key={index}>
//             <td>{item.localizacao}</td>
//             <td>{item.quantidade_companhias}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// export default CompaniesCountTable;

// src/CompaniesCountTable.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const CompaniesCountTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Função para buscar os dados do endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/companies-count"
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
          <th>Location</th>
          <th>Number of Companies</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.localizacao}</td>
            <td>{item.quantidade_companhias}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CompaniesCountTable;
