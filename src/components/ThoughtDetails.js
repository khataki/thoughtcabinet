import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import './ThoughtDetails.css';

const ThoughtDetails = ({ thought, updateThought, removeThought, updateStatus }) => {
  const [activeTab, setActiveTab] = useState('Проблема');
  const [isEditing, setIsEditing] = useState(false);
  const [editedThought, setEditedThought] = useState(thought);

  useEffect(() => {
    if (thought) {
      setEditedThought(thought);
    }
  }, [thought]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedThought({ ...editedThought, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateThought(editedThought);
    setIsEditing(false);
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const handleForget = () => {
    removeThought(thought._id); 
  };

  const findSolution = () => {
    if (!editedThought.solution) {
      setEditedThought({ ...editedThought, solution: 'Введите ваше решение здесь...' });
    }
    updateStatus(thought._id, 'Решение');
    setActiveTab('Решение');
  };

  return (
    <div className="thought-details">
      {!isEditing ? (
        <>
          <img src={thought.image} alt={thought.title} className="thought-image" />
          <h2>{thought.title}</h2>
          <div className="tabs">
            <button
              className={activeTab === 'Проблема' ? 'active' : ''}
              onClick={() => handleTabChange('Проблема')}
            >
              Проблема
            </button>
            <button
              className={activeTab === 'Решение' ? 'active' : ''}
              onClick={() => handleTabChange('Решение')}
            >
              Решение
            </button>
          </div>
          <div className="thought-content">
            {activeTab === 'Проблема' ? (
              <p>{thought.details}</p>
            ) : (
              <p>{thought.solution || 'Введите ваше решение здесь...'}</p>
            )}
          </div>
          <div className="thought-actions">
            <button onClick={handleForget} className="forget-button"><FaTrash /> Забыть</button>
            <button onClick={startEditing} className="edit-button"><FaEdit /> Редактировать</button>
            {thought.status === 'Проблема' && (
              <button onClick={findSolution} className="solution-button"><FaCheck /> Найти решение</button>
            )}
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Редактировать мысль</h2>
          <input
            type="text"
            name="title"
            value={editedThought.title}
            onChange={handleChange}
            placeholder="Название мысли"
            required
          />
          <input
            type="text"
            name="image"
            value={editedThought.image}
            onChange={handleChange}
            placeholder="URL изображения"
          />
          <div className="tabs">
            <button
              type="button"
              className={activeTab === 'Проблема' ? 'active' : ''}
              onClick={() => handleTabChange('Проблема')}
            >
              Проблема
            </button>
            <button
              type="button"
              className={activeTab === 'Решение' ? 'active' : ''}
              onClick={() => handleTabChange('Решение')}
            >
              Решение
            </button>
          </div>
          {activeTab === 'Проблема' && (
            <textarea
              name="details"
              value={editedThought.details}
              onChange={handleChange}
              placeholder="Проблема"
              required
            />
          )}
          {activeTab === 'Решение' && (
            <textarea
              name="solution"
              value={editedThought.solution}
              onChange={handleChange}
              placeholder="Решение"
              required
            />
          )}
          <button type="submit"><FaEdit /> Сохранить</button>
          <button type="button" onClick={() => setIsEditing(false)}><FaTrash /> Отмена</button>
        </form>
      )}
    </div>
  );
};

export default ThoughtDetails;