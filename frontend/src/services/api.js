import axios from 'axios';

// Instance axios configurée avec l'URL de base
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Exemple: http://localhost:5000/api
});

// 🔐 Utilitaires d'auth
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);

// 📍 POI publics
export const getPOIs = () => API.get('/pois');

// 📍 POI protégés (auth requis)
export const addPOI = (data) => {
  const token = localStorage.getItem('token');
  return API.post('/pois', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
