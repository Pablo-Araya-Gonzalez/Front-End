// src/components/SurveyForm.js
import React, { useState, useEffect } from 'react';
import { submitSurvey, getQuestions } from '../api/api';
import './SurveyForm.css'; // Asegúrate de importar los estilos CSS

const SurveyForm = ({ userId, email, onComplete }) => {
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
      const response = await submitSurvey({
        usuario_id: userId,
        encuesta_id: 1,
        respuestas: answers
      });
      setMessage('Encuesta enviada con éxito.');
      console.log('Encuesta enviada:', response.data);

      // Llama a onComplete para redirigir al reporte
      console.log("Llamando a onComplete para redirigir al reporte...");
      onComplete();
    } catch (error) {
      console.error('Error al enviar la encuesta:', error);
      setMessage('Error al enviar la encuesta.');
    }
  };

  return (
    <div className="survey-form">
      <h3>Formulario de Encuesta</h3>
      {questions.map((question) => (
        <div key={question.id} className="question">
          <p>{question.texto}</p>
          <div className="options">
            <button
              className={`option-button ${answers[`p${question.id}`] === 'sí' ? 'selected' : ''}`}
              onClick={() => handleChange(`p${question.id}`, 'sí')}
            >
              Sí
            </button>
            <button
              className={`option-button ${answers[`p${question.id}`] === 'no' ? 'selected' : ''}`}
              onClick={() => handleChange(`p${question.id}`, 'no')}
            >
              No
            </button>
          </div>
        </div>
      ))}
      <button onClick={handleSubmit}>Enviar Encuesta</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SurveyForm;
