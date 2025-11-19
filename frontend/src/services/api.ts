// src/services/api.ts
import axios from 'axios';

// Creamos una instancia de Axios con la configuración base
const api = axios.create({
  // URL de tu servidor Node.js
  baseURL: 'http://localhost:3001/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;