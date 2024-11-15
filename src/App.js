import React, { useState } from 'react';
import { registerUser } from './api/api';
import SurveyForm from './components/SurveyForm';
import Report from './components/Report';
import './App.css';

const App = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [userRegistered, setUserRegistered] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showReport, setShowReport] = useState(false);

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

  const handleShowReport = () => {
    setShowReport(true);
  };

  return (
    <div className="container">
      <h2>Registro y Encuesta</h2>

      {!userRegistered ? (
        <div>
          <h3>Registro</h3>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleRegister}>Comenzar Encuesta</button>
        </div>
      ) : showReport ? (
        <Report userId={userId} />
      ) : (
        <SurveyForm userId={userId} onComplete={handleShowReport} />
      )}
    </div>
  );
};

export default App;
