// src/components/ThoughtItem.js
import React from 'react';

const ThoughtItem = ({ thought, index, removeThought }) => {
  return (
    <li>
      {thought}
      <button onClick={() => removeThought(index)}>Remove</button>
    </li>
  );
};

export default ThoughtItem;