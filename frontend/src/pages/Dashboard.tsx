import { useEffect, useState } from "react";
import api from "../services/api";
import StatCard from "../components/StatCard";

interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  description: string;
}

interface Notification {
  id: number;
  message: string;
  receiver: string;
  createdAt: string;
}

export default function Dashboard() {

  const [pets, setPets] = useState<Pet[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    loadPets();
    loadNotifications();
  }, []);

  async function loadPets() {
    const response = await api.get("/pets");
    setPets(response.data);
  }

  async function loadNotifications() {
    const response = await api.get("/notifications");
    setNotifications(response.data);
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
          title="Alertas"
          value={notifications.length}
          emoji="🔔"
        />

        <StatCard
          title="Perros"
          value={
            pets.filter(
              (p) => p.species === "Perro"
            ).length
          }
          emoji="🐶"
        />

        <StatCard
          title="Gatos"
          value={
            pets.filter(
              (p) => p.species === "Gato"
            ).length
          }
          emoji="🐱"
        />

        <StatCard
          title="Aves"
          value={
            pets.filter(
              (p) => p.species === "Ave"
            ).length
          }
          emoji="🦜"
        />
      </div>

      <br />

      <h2>Últimos registros</h2>

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

      <br />

      <h2>Últimas alertas</h2>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Mensaje</th>
          </tr>
        </thead>

        <tbody>
          {notifications.slice(0, 5).map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}