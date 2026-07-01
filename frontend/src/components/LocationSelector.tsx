import { useMapEvents, Marker } from "react-leaflet";
import L from "leaflet";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const icon = new L.Icon({
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface Props {

  position: [number, number];

  onChange: (
    lat: number,
    lng: number
  ) => void;

}

export default function LocationSelector({

  position,

  onChange,

}: Props) {

  useMapEvents({

    click(e) {

      onChange(
        e.latlng.lat,
        e.latlng.lng
      );

    },

  });

  return (
    <Marker
      icon={icon}
      position={position}
    />
  );

}