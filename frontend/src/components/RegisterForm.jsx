import { useState } from 'react';
import { register } from '../services/api';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await register({ email, password });
      alert("Inscription réussie !");
    } catch {
      alert("Erreur lors de l'inscription");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Inscription</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" />
      <button type="submit">S'inscrire</button>
    </form>
  );
}
