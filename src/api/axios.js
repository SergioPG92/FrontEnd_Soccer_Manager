/*import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api', // Cambia si usas otro puerto o dominio
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Interceptor para incluir token si existe
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default instance;


*/