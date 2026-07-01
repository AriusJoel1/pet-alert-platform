import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import PetMap from "../components/PetMap";
import { uploadImage } from "../services/upload";

interface Pet {
  id?: number;
  name: string;
  species: string;
  breed: string;
  description: string;
  photo: string;
  latitude: number;
  longitude: number;
}



const emptyPet: Pet = {
  name: "",
  species: "",
  breed: "",
  description: "",
  photo: "",
  latitude: -12.0464,
  longitude: -77.0428,
};

export default function LostPets() {

  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [form, setForm] = useState<Pet>(emptyPet);

  useEffect(() => {
    loadPets();
  }, []);

  async function loadPets() {
    setLoading(true);

    try {
      const response = await api.get("/pets");
      setPets(response.data);
    } finally {
      setLoading(false);
    }
  }

  async function searchPet() {
    const response = await api.get("/pets/search", {
      params: {
        type: searchType,
        value: search,
      },
    });

    setPets(response.data);
  }

  async function savePet() {

    if (
      !form.name.trim() ||
      !form.species.trim() ||
      !form.breed.trim()
    ) {
      alert("Complete los campos obligatorios.");
      return;
    }

    const payload = {
      name: form.name,
      species: form.species,
      breed: form.breed,
      description: form.description,
      photo: form.photo,
      latitude: form.latitude,
      longitude: form.longitude,
    };

    if (editingId === null) {

      await api.post("/pets", payload);

      alert("Mascota registrada correctamente.");

    } else {

      await api.patch(`/pets/${editingId}`, payload);

      alert("Mascota actualizada.");

    }

    await loadPets();

    cancelEdition();
  }

  function editPet(pet: Pet) {

    setEditingId(pet.id!);

    setForm({
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      description: pet.description,
      photo: pet.photo,
      latitude: pet.latitude,
      longitude: pet.longitude,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }

  function cancelEdition() {

    setEditingId(null);

    setForm(emptyPet);

  }

  async function removePet(id: number) {

    const ok = confirm(
      "¿Eliminar esta mascota?"
    );

    if (!ok) return;

    await api.delete(`/pets/${id}`);

    loadPets();

  }

  const filteredPets = pets;

  return (

    <div>

      <h1>🐾 Mascotas Perdidas</h1>

      <br />

      <div className="form-card">

        <h2>

          {editingId === null

            ? "Registrar mascota"

            : "Editar mascota"}

        </h2>

        <input
          placeholder="Nombre"
          value={form.name}
          onChange={(e)=>
            setForm({
              ...form,
              name:e.target.value
            })
          }
        />

        <input
          placeholder="Especie"
          value={form.species}
          onChange={(e)=>
            setForm({
              ...form,
              species:e.target.value
            })
          }
        />

        <input
          placeholder="Raza"
          value={form.breed}
          onChange={(e)=>
            setForm({
              ...form,
              breed:e.target.value
            })
          }
        />

        <textarea
          placeholder="Descripción"
          value={form.description}
          onChange={(e)=>
            setForm({
              ...form,
              description:e.target.value
            })
          }
        />
          
        

        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {

            if (!e.target.files?.length) return;

            try {

              const url = await uploadImage(e.target.files[0]);

              setForm({
                ...form,
                photo: url,
              });

            } catch {

              alert("No se pudo subir la imagen.");

            }

          }}
        />

        <br />

        {form.photo && (

          <img
            src={form.photo}
            width={180}
            style={{
              marginTop: 10,
              borderRadius: 10,
              objectFit: "cover",
            }}
          />

        )}




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

        
        <div
          style={{
            display:"flex",
            gap:10
          }}
        >

          <button
            className="primary-btn"
            onClick={savePet}
          >

            {editingId===null

              ? "Registrar"

              : "Actualizar"}

          </button>

          {editingId!==null && (

            <button
              onClick={cancelEdition}
            >
              Cancelar
            </button>

          )}

        </div>

      </div>

      <br/>

      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginBottom: 10,
        }}
      >
        <option value="name">Nombre</option>
        <option value="species">Especie</option>
        <option value="breed">Raza</option>
      </select>

      <input
        placeholder="Buscar mascota..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginBottom: 10,
        }}
      />

      <button
        className="primary-btn"
        onClick={searchPet}
      >
        Buscar
      </button>

      {loading && <p>Cargando...</p>}

      {!loading && (
        <table className="table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Foto</th>
              <th>Nombre</th>
              <th>Especie</th>
              <th>Raza</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>

            {filteredPets.map((pet)=>(
                <tr key={pet.id}>
                <td>{pet.id}</td>

                <td>
                  <img
                    src={pet.photo}
                    width={70}
                    height={70}
                    style={{
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                    alt={pet.name}
                  />
                </td>

                <td>{pet.name}</td>
                <td>{pet.species}</td>
                <td>{pet.breed}</td>

                <td>

                  <button
                    onClick={() => editPet(pet)}
                    style={{
                      marginRight: 8,
                    }}
                  >
                    ✏ Editar
                  </button>

                  <button
                    style={{
                      background: "#d32f2f",
                      color: "white",
                    }}
                    onClick={() =>
                      removePet(pet.id!)
                    }
                  >
                    🗑 Eliminar
                  </button>

                </td>

              </tr>

            ))}

            {filteredPets.length === 0 && (

              <tr>

                <td
                  colSpan={5}
                  style={{
                    textAlign: "center",
                    padding: 30,
                  }}
                >
                  No se encontraron mascotas.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      )}

        <br/>

        <h2>

        Mapa de mascotas perdidas

        </h2>

        <PetMap

        pets={filteredPets}

        selectedPosition={[

        form.latitude,

        form.longitude

        ]}

        onSelectLocation={(lat,lng)=>{

        setForm({

        ...form,

        latitude:lat,

        longitude:lng

        });

        }}

        />



    </div>


  );

}


