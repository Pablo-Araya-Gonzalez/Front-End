// src/App.js
import React, { useState } from 'react';
import { registerUser } from './api/api';
import SurveyForm from './components/SurveyForm';
import Report from './components/Report';

const App = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [userRegistered, setUserRegistered] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showReport, setShowReport] = useState(false);

  // Función para manejar el registro de usuario
  const handleRegister = async () => {
    try {
      const response = await registerUser({ nombre, email });
      console.log('Usuario registrado:', response.data);

      setUserId(response.data.id);
      setUserRegistered(true);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  // Función para mostrar el reporte después de enviar la encuesta
  const handleShowReport = () => {
    console.log("Redirigiendo al reporte completo"); // Este mensaje debería aparecer si onComplete se llama
    setShowReport(true);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Registro y Encuesta</h2>

      {!userRegistered ? (
        <div>
          <h3>Registro</h3>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ width: '100%', padding: '8px', margin: '8px 0' }}
          />
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', margin: '8px 0' }}
          />
          <button
            onClick={handleRegister}
            style={{ width: '100%', padding: '10px', margin: '8px 0' }}
          >
            Comenzar Encuesta
          </button>
        </div>
      ) : showReport ? (
        <Report userId={userId} /> // Muestra el componente de reporte si showReport es true
      ) : (
        <SurveyForm userId={userId} onComplete={handleShowReport} /> // Aquí pasamos handleShowReport como onComplete
      )}
    </div>
  );
};

export default App;
