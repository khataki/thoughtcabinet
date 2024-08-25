import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThoughtList from './ThoughtList';
import ThoughtTree from './ThoughtTree';
import ThoughtDetails from './ThoughtDetails';
import AddThoughtForm from './AddThoughtForm';
import { FaPlus } from 'react-icons/fa';
import './ThoughtCabinet.css';

const ThoughtCabinet = () => {
  const [thoughts, setThoughts] = useState([]);
  const [selectedThought, setSelectedThought] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:5000/thoughts')
      .then((response) => {
        setThoughts(response.data);
      })
      .catch((error) => {
        console.error('Error loading thoughts:', error);
      });
  }, []);

  const addThought = (thought) => {
    axios
      .post('http://localhost:5000/thoughts', thought)
      .then((response) => {
        setThoughts([...thoughts, response.data]);
        setIsAdding(false);
        setSelectedThought(null);
      })
      .catch((error) => {
        console.error('Error adding thought:', error);
      });
  };

  const updateThought = (updatedThought) => {
    axios
      .put(`http://localhost:5000/thoughts/${updatedThought._id}`, updatedThought)
      .then((response) => {
        setThoughts(thoughts.map(thought => thought._id === updatedThought._id ? response.data : thought));
        setIsEditing(false);
        setSelectedThought(response.data);
      })
      .catch((error) => {
        console.error('Error updating thought:', error);
      });
  };

  const removeThought = (id) => {
    axios
      .delete(`http://localhost:5000/thoughts/${id}`)
      .then(() => {
        setThoughts(thoughts.filter(thought => thought._id !== id));
        setSelectedThought(null);
        setIsEditing(false);
        setIsAdding(false);
      })
      .catch((error) => {
        console.error('Error removing thought:', error);
      });
  };

  const selectThought = (thought) => {
    setSelectedThought(thought);
    setIsEditing(false);
    setIsAdding(false);
  };

  const startAdding = () => {
    setIsAdding(true);
    setSelectedThought(null);
    setIsEditing(false);
  };

  const updateStatus = (id, status) => {
    const thoughtToUpdate = thoughts.find(thought => thought._id === id);
    if (thoughtToUpdate) {
      const updatedThought = { ...thoughtToUpdate, status };
      updateThought(updatedThought);
    }
  };

  return (
    <div className="thought-cabinet">
      <div className="thought-list-container">
        <ThoughtList thoughts={thoughts} selectThought={selectThought} removeThought={removeThought} />
        <button onClick={startAdding} className="add-thought-button"><FaPlus /> Добавить новую мысль</button>
        {isAdding && <AddThoughtForm addThought={addThought} />}
      </div>
      <div className="thought-tree-container">
        <ThoughtTree thoughts={thoughts} selectThought={selectThought} />
      </div>
      <div className="thought-details-container">
        {selectedThought && (
          <ThoughtDetails
            thought={selectedThought}
            updateThought={updateThought}
            removeThought={removeThought}
            updateStatus={updateStatus}
          />
        )}
      </div>
    </div>
  );
};

export default ThoughtCabinet;