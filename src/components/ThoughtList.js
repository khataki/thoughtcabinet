// src/components/ThoughtList.js
import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './ThoughtList.css';

const ThoughtList = ({ thoughts, selectThought, removeThought }) => {
  return (
    <div className="thought-list">
      {thoughts.map((thought) => (
        <div key={thought._id} className={`thought-item ${thought.status === 'Проблема' ? 'problem' : 'solution'}`}>
          <span onClick={() => selectThought(thought)}>{thought.title}</span>
          <div className="thought-item-actions">
            <button onClick={() => selectThought(thought)}><FaEdit /></button>
            <button onClick={() => removeThought(thought._id)}><FaTrash /></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThoughtList;