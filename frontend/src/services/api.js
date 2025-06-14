import axios from 'axios';

// Instance axios configurée avec l'URL de base
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔐 Utilitaires d'auth
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);

// 📍 POI publics
export function getPOIs() {
  return api.get('/pois');
}

export const addPOI = (data) => {
    const token = localStorage.getItem('token');
  return api.post('/pois', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};