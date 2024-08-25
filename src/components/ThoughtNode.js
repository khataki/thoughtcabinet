// src/components/ThoughtNode.js
import React from 'react';
import './ThoughtNode.css';

const ThoughtNode = ({ thought, onClick }) => {
  const statusClass = thought.status === 'Проблема' ? 'problem' : 'solution';

  return (
    <div className="thought-node-container" onClick={() => onClick(thought)}>
      <div className={`thought-node ${statusClass}`}>
        <img src={thought.image} alt={thought.title} />
      </div>
      <div className="thought-title">{thought.title}</div>
    </div>
  );
};

export default ThoughtNode;