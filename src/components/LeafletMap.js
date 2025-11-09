"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const materialIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'%3E%3Cpath fill='%23E53935' d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z'/%3E%3Ccircle fill='%23fff' cx='12' cy='9' r='2.5'/%3E%3C/svg%3E",
  iconSize: [50, 50],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  shadowUrl: "",
});

export function LeafletMap({ lat, lng, address }) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={14}
      scrollWheelZoom={true}
      style={{ height: "28rem", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lng]} icon={materialIcon}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
}
