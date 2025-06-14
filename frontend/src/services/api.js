import axios from 'axios';

// Instance axios configurée avec l'URL de base
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔐 Utilitaires d'auth
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);

// 📍 POI publics
export function getPOIs() {
  return api.get('/pois');
}

// 📍 POI protégés (auth requis)
export const addPOI = (data) => {
  const token = localStorage.getItem('token');
  return api.post('/pois', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
