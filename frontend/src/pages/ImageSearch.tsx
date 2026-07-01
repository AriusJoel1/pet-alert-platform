import { useState } from "react";
import api from "../services/api";

interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  description: string;
  photo: string;
}

export default function ImageSearch() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(false);

  async function search() {
    if (!file) {
      alert("Seleccione una imagen.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await api.post(
        "/pets/search-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setResult(response.data);
      
    } catch (e) {
      console.error(e);
      alert("No se pudo realizar la búsqueda.");
    }

    setLoading(false);
  }

  return (
    <div>

      <h1>🔎 Buscar mascota por imagen</h1>

      <br />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {

          if (!e.target.files?.length) return;

          const image = e.target.files[0];

          setFile(image);

          setPreview(URL.createObjectURL(image));

          setResult(null);

        }}
      />

      <br />
      <br />

      {preview && (
        <img
          src={preview}
          width={250}
          style={{
            borderRadius: 12,
            marginBottom: 20,
            objectFit: "cover",
          }}
        />
      )}

      <br />

      <button
        className="primary-btn"
        onClick={search}
      >
        Buscar
      </button>

      <br />
      <br />

      {loading && <h3>Buscando...</h3>}

      {result && (

        <div className="form-card">

          <h2>Mascota encontrada</h2>
            <h4>URL de la foto:</h4>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          <img
            src={result.photo}
            width={250}
            style={{
              borderRadius: 12,
            }}
          />

          <h3>{result.name}</h3>

          <p>
            <b>Especie:</b> {result.species}
          </p>

          <p>
            <b>Raza:</b> {result.breed}
          </p>

          <p>{result.description}</p>

        </div>

      )}

    </div>
  );
}