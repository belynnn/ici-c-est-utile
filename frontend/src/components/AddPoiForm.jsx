import { useState } from 'react';
import { addPOI } from '../services/api';

export default function AddPoiForm({ refreshPOIs }) {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert("Non connecté");

    try {
      await addPOI({ lat, lng, type, description }, token);
      refreshPOIs();
    } catch {
      alert("Erreur ajout POI");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter un POI</h2>
      <input value={lat} onChange={e => setLat(e.target.value)} placeholder="Latitude" />
      <input value={lng} onChange={e => setLng(e.target.value)} placeholder="Longitude" />
      <input value={type} onChange={e => setType(e.target.value)} placeholder="Type" />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <button type="submit">Ajouter</button>
    </form>
  );
}
