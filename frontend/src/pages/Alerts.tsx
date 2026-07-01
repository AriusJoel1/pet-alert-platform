import { useEffect, useState } from "react";
import { getNotifications } from "../services/notification";
import StatCard from "../components/StatCard";

interface Notification {
  id: number;
  message: string;
  receiver: string;
  createdAt: string;
}

export default function Alerts() {

  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getNotifications();
    setNotifications(data);
  }

  return (
    <>
      <h1>🔔 Centro de alertas</h1>

      <br />

      {/* ESTADÍSTICA  */}
      <StatCard
        title="Alertas"
        value={notifications.length}
        emoji="🔔"
      />

      <br />

      <table className="table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Mensaje</th>
            <th>Destinatario</th>
            <th>Fecha</th>
          </tr>
        </thead>

        <tbody>
          {notifications.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.message}</td>
              <td>{item.receiver}</td>
              <td>
                {new Date(item.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </>
  );
}