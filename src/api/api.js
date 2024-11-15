// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Asegúrate de que esta URL coincida con la de tu backend
});

export const registerUser = (data) => api.post('/usuarios', data);
export const submitSurvey = (data) => api.post('/respuestas', data);
export const getUserReport = (userId) => api.get(`/usuarios/${userId}/reporte`);
export const getResponseHistory = (userId) => api.get(`/usuarios/${userId}/respuestas`);
export const getQuestions = () => api.get('/preguntas');

// Asegúrate de definir y exportar downloadUserReportExcel aquí
export const downloadUserReportExcel = (userId) =>
  api.get(`/usuarios/${userId}/reporte/excel`, { responseType: 'blob' });

export default api;
