// src/components/SurveyForm.js
import React, { useState, useEffect } from 'react';
import { submitSurvey, getQuestions } from '../api/api';

const SurveyForm = ({ userId, email, onComplete }) => { // Asegúrate de que onComplete esté aquí
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [message, setMessage] = useState('');

  // Cargar preguntas desde el backend al montar el componente
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getQuestions();
        setQuestions(response.data);
      } catch (error) {
        console.error('Error al obtener las preguntas:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    try {
      // Envía userId, encuesta_id y respuestas al backend
      const response = await submitSurvey({
        usuario_id: userId,
        encuesta_id: 1,
        respuestas: answers
      });
      setMessage('Encuesta enviada con éxito.');
      console.log('Encuesta enviada:', response.data);

      // Llama a onComplete para redirigir al reporte
      console.log("Llamando a onComplete para redirigir al reporte..."); // Agrega este console.log para depuración
      onComplete(); // Llama a onComplete para activar el redireccionamiento
    } catch (error) {
      console.error('Error al enviar la encuesta:', error);
      setMessage('Error al enviar la encuesta.');
    }
  };

  return (
    <div>
      <h3>Formulario de Encuesta</h3>
      {/* Muestra las preguntas dinámicamente */}
      {questions.map((question) => (
        <div key={question.id}>
          <p>{question.texto}</p>
          <button onClick={() => handleChange(`p${question.id}`, 'sí')}>Sí</button>
          <button onClick={() => handleChange(`p${question.id}`, 'no')}>No</button>
        </div>
      ))}
      <button onClick={handleSubmit}>Enviar Encuesta</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SurveyForm;
