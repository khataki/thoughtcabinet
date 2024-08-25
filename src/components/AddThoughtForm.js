// src/components/AddThoughtForm.js
import React, { useState } from 'react';
import './AddThoughtForm.css';

const AddThoughtForm = ({ addThought }) => {
  const [thought, setThought] = useState({
    title: '',
    details: '',
    image: '',
    status: 'Проблема',
    solution: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setThought({ ...thought, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addThought(thought);
    setThought({
      title: '',
      details: '',
      image: '',
      status: 'Проблема',
      solution: ''
    });
  };

  return (
    <form className="add-thought-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={thought.title}
        onChange={handleChange}
        placeholder="Название мысли"
        required
      />
      <textarea
        name="details"
        value={thought.details}
        onChange={handleChange}
        placeholder="Описание проблемы"
        required
      />
      <input
        type="text"
        name="image"
        value={thought.image}
        onChange={handleChange}
        placeholder="URL изображения"
      />
      <button type="submit">Добавить мысль</button>
    </form>
  );
};

export default AddThoughtForm;