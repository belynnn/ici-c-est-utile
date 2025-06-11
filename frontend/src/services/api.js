import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);

export const getPOIs = () => API.get('/pois');
export const addPOI = (data, token) =>
  API.post('/pois', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
