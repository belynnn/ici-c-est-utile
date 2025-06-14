import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapView({ pois }) {
  console.log('POIs reçus dans MapView:', pois);

  return (
    <MapContainer center={[50.8503, 4.3517]} zoom={12}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {pois.map((poi, i) => (
        <Marker key={poi._id} position={[poi.lat, poi.lng]}>
          <Popup>
            <b>{poi.name || poi.type}</b><br />
            {poi.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
