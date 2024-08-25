import React from 'react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import './ThoughtStatus.css';

const ThoughtStatus = ({ thought, updateStatus }) => {
  if (!thought) {
    return null; // Если thought не определен, не рендерить компонент
  }

  const toggleStatus = () => {
    const newStatus = thought.status === 'Проблема' ? 'Решение' : 'Проблема';
    updateStatus(thought._id, newStatus); // Используем _id для MongoDB
  };

  return (
    <div className="thought-status">
      {thought.status === 'Проблема' ? (
        <button onClick={toggleStatus} className="status-button problem">
          <FaExclamationCircle /> Проблема
        </button>
      ) : (
        <button onClick={toggleStatus} className="status-button solution">
          <FaCheckCircle /> Решение
        </button>
      )}
    </div>
  );
};

export default ThoughtStatus;