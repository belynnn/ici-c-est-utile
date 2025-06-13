import { useState } from 'react';
import { addPOI } from '../services/api';

export default function AddPoiForm({ refreshPOIs }) {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await addPOI({ lat, lng, type, description });
      refreshPOIs();
      // Réinitialisation du formulaire après ajout
      setLat('');
      setLng('');
      setType('');
      setDescription('');
    } catch (err) {
      alert("Erreur ajout POI : " + (err.response?.data?.error || err.message));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter un POI</h2>
      <input
        type="text"
        value={lat}
        onChange={e => setLat(e.target.value)}
        placeholder="Latitude"
      />
      <input
        type="text"
        value={lng}
        onChange={e => setLng(e.target.value)}
        placeholder="Longitude"
      />
      <input
        type="text"
        value={type}
        onChange={e => setType(e.target.value)}
        placeholder="Type"
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}
