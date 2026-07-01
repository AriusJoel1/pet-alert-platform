import { useEffect, useState } from "react";
import api from "../services/api";

interface Caregiver {

  id?: number;

  fullName: string;

  role: string;

  acceptedSpecies: string;

  acceptsMedication: boolean;

  rating: number;

}

const empty = {

  fullName: "",

  role: "SOLIDARIO",

  acceptedSpecies: "",

  acceptsMedication: false,

  rating: 5,

};

export default function Caregivers() {

  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);

  const [form, setForm] = useState<Caregiver>(empty);

  const [editing, setEditing] = useState<number | null>(null);

  useEffect(() => {

    load();

  }, []);

  async function load() {

    const response = await api.get("/caregivers");

    setCaregivers(response.data);

  }

  async function save() {

    if (editing === null) {

      await api.post("/caregivers", form);

    } else {

      await api.patch(`/caregivers/${editing}`, form);

    }

    setForm(empty);

    setEditing(null);

    load();

  }

  function edit(item: Caregiver) {

    setEditing(item.id!);

    setForm(item);

  }

  async function remove(id: number) {

    if (!confirm("Eliminar cuidador?")) return;

    await api.delete(`/caregivers/${id}`);

    load();

  }

  return (
    <div>

      <h1>👨‍⚕️ Cuidadores</h1>

      <br />

      <div className="form-card">

        <input
          placeholder="Nombre"
          value={form.fullName}
          onChange={(e) =>
            setForm({
              ...form,
              fullName: e.target.value,
            })
          }
        />

        <select
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value,
            })
          }
        >
          <option>SOLIDARIO</option>
          <option>PROFESIONAL</option>
          <option>ESPECIALIZADO</option>
        </select>

        <input
          placeholder="Especies"
          value={form.acceptedSpecies}
          onChange={(e) =>
            setForm({
              ...form,
              acceptedSpecies: e.target.value,
            })
          }
        />

        <label>

          <input
            type="checkbox"
            checked={form.acceptsMedication}
            onChange={(e) =>
              setForm({
                ...form,
                acceptsMedication:
                  e.target.checked,
              })
            }
          />

          Acepta medicación

        </label>

        <button
          className="primary-btn"
          onClick={save}
        >
          {editing === null
            ? "Registrar"
            : "Actualizar"}
        </button>

      </div>

      <br />

      <table className="table">

        <thead>

          <tr>

            <th>Nombre</th>

            <th>Rol</th>

            <th>Especies</th>

            <th>Rating</th>

            <th></th>

          </tr>

        </thead>

        <tbody>

          {caregivers.map((c) => (

            <tr key={c.id}>

              <td>{c.fullName}</td>

              <td>{c.role}</td>

              <td>{c.acceptedSpecies}</td>

              <td>⭐ {c.rating}</td>

              <td>

                <button
                  onClick={() =>
                    edit(c)
                  }
                >
                  Editar
                </button>

                <button
                  onClick={() =>
                    remove(c.id!)
                  }
                >
                  Eliminar
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );

}