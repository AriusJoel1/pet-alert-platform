import { useEffect, useState } from "react";
import api from "../services/api";
import { uploadImage } from "../services/upload";

interface Pet {
  id: number;
  name: string;
}

interface Sighting {
  id?: number;
  photo: string;
  description: string;
  latitude: number;
  longitude: number;
  pet: {
    id: number;
  };
}

const empty = {
  photo: "",
  description: "",
  latitude: -12.0464,
  longitude: -77.0428,
  pet: {
    id: 0,
  },
};

export default function Sightings() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [sightings, setSightings] = useState<Sighting[]>([]);
  const [form, setForm] = useState(empty);

  const [editing, setEditing] = useState<number | null>(null);

  useEffect(() => {
    loadPets();
    loadSightings();
  }, []);

  async function loadPets() {
    const response = await api.get("/pets");
    
    console.log(response.data);
    setPets(response.data);

    if (response.data.length > 0) {
      setForm({
        ...empty,
        pet: {
          id: response.data[0].id,
        },
      });
    }
  }

  async function loadSightings() {
    const response = await api.get("/sightings");

    setSightings(response.data);
  }

  async function save() {
    console.log(form);
   
    if (editing === null) {
      await api.post("/sightings", form);
    } else {
      await api.patch(`/sightings/${editing}`, form);
    }

    setForm({
      ...empty,
      pet: {
        id: pets.length > 0 ? pets[0].id : 0,
      },
    });

    setEditing(null);

    loadSightings();
  }

  function edit(item: Sighting) {
    setEditing(item.id!);
    setForm(item);
  }

  async function remove(id: number) {
    if (!confirm("Eliminar?")) return;

    await api.delete(`/sightings/${id}`);

    loadSightings();
  }

  return (
    <div>
      <h1>👀 Avistamientos</h1>

      <br />

      <div className="form-card">
        <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
                if (!e.target.files?.length) return;

                const url = await uploadImage(e.target.files[0]);

                setForm({
                ...form,
                photo: url,
                });
            }}
        />
        
        {form.photo && (
        <img
            src={form.photo}
            style={{
            width: 180,
            height: 180,
            objectFit: "cover",
            borderRadius: 10,
            marginTop: 10,
            }}
            alt="Vista previa"
        />
        )}

        <textarea
          placeholder="Descripción"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <input
          type="number"
          step="0.000001"
          placeholder="Latitud"
          value={form.latitude}
          onChange={(e) =>
            setForm({
              ...form,
              latitude: Number(e.target.value),
            })
          }
        />

        <input
          type="number"
          step="0.000001"
          placeholder="Longitud"
          value={form.longitude}
          onChange={(e) =>
            setForm({
              ...form,
              longitude: Number(e.target.value),
            })
          }
        />

        <select
          value={form.pet.id}
          onChange={(e) =>
            setForm({
              ...form,
              pet: {
                id: Number(e.target.value),
              },
            })
          }
        >
          {pets.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <button className="primary-btn" onClick={save}>
          {editing === null ? "Registrar" : "Actualizar"}
        </button>
      </div>

      <br />

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Mascota</th>
            <th>Descripción</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {sightings.map((s: any) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.pet?.name}</td>
              <td>{s.description}</td>
              <td>
                <button onClick={() => edit(s)}>Editar</button>

                <button onClick={() => remove(s.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}