// src/components/Report.js
import React, { useState, useEffect } from 'react';
import { getUserReport, downloadUserReportExcel } from '../api/api';

const Report = ({ userId }) => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await getUserReport(userId);
        setReport(response.data);
      } catch (error) {
        console.error('Error al obtener el reporte:', error);
      }
    };

    fetchReport();
  }, [userId]);

  // Función para manejar la descarga del reporte en Excel
  const handleDownload = async () => {
    try {
      const response = await downloadUserReportExcel(userId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `reporte_usuario_${userId}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al descargar el reporte:', error);
    }
  };

  if (!report) return <p>Cargando reporte...</p>;

  return (
    <div>
      <h3>Reporte Completo</h3>
      <p><strong>Nombre:</strong> {report.usuario.nombre}</p>
      <p><strong>Email:</strong> {report.usuario.email}</p>
      <p><strong>Puntaje Final:</strong> {report.puntaje_final}</p>
      <div>
        <h5>Respuestas:</h5>
        <ul>
          {report.respuestas.map((respuesta, index) => (
            <li key={index}>
              {respuesta.pregunta}: {respuesta.respuesta_usuario} -{' '}
              {respuesta.es_correcta ? 'Correcto' : 'Incorrecto'}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleDownload}>Descargar Reporte en Excel</button>
    </div>
  );
};

export default Report;
