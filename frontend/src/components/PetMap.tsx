import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const icon = new L.Icon({
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface Pet {
  id?: number;
  name: string;
  species: string;
  breed: string;
  description: string;
  latitude: number;
  longitude: number;
}

interface Props {
  pets: Pet[];
  selectedPosition?: [number, number];
  onSelectLocation?: (lat: number, lng: number) => void;
}

/**
 * Componente interno para seleccionar ubicación en el mapa
 */
function LocationSelector({
  onSelect,
}: {
  onSelect: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
}

export default function PetMap({
  pets,
  selectedPosition,
  onSelectLocation,
}: Props) {
  return (
    <MapContainer
      center={[-12.0464, -77.0428]}
      zoom={12}
      style={{
        height: "550px",
        width: "100%",
        borderRadius: 12,
        marginTop: 20,
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* 📍 Selector de ubicación (CLICK EN MAPA) */}
      {onSelectLocation && (
        <LocationSelector onSelect={onSelectLocation} />
      )}

      {/* 📌 Marcador temporal seleccionado */}
      {selectedPosition && (
        <Marker position={selectedPosition} icon={icon}>
          <Popup>Ubicación seleccionada</Popup>
        </Marker>
      )}

      {/* 🐶 Mascotas */}
      {pets.map((pet) => (
        <Marker
          key={pet.id}
          position={[
            pet.latitude || -12.0464,
            pet.longitude || -77.0428,
          ]}
          icon={icon}
        >
          <Popup>
            <h3>{pet.name}</h3>
            <p><b>Especie:</b> {pet.species}</p>
            <p><b>Raza:</b> {pet.breed}</p>
            <p>{pet.description}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}