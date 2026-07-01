import { useEffect, useState } from "react";
import api from "../services/api";
import StatCard from "../components/StatCard";

interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
}

export default function Dashboard() {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    loadPets();
  }, []);

  async function loadPets() {
    try {
      const response = await api.get("/pets");
      setPets(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1>📊 Dashboard</h1>

      <br />

      <div
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <StatCard
          title="Mascotas Perdidas"
          value={pets.length}
          emoji="🐾"
        />

        <StatCard
          title="Avistamientos"
          value={0}
          emoji="📍"
        />

        <StatCard
          title="Cuidadores"
          value={0}
          emoji="👨‍⚕️"
        />

        <StatCard
          title="Alertas"
          value={0}
          emoji="🔔"
        />
      </div>

      <br />
      <br />

      <h2>Últimas mascotas registradas</h2>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Especie</th>
            <th>Raza</th>
          </tr>
        </thead>

        <tbody>
          {pets.map((pet) => (
            <tr key={pet.id}>
              <td>{pet.id}</td>
              <td>{pet.name}</td>
              <td>{pet.species}</td>
              <td>{pet.breed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}