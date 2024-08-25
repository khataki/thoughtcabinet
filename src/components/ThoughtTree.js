import React from 'react';
import ThoughtNode from './ThoughtNode';
import './ThoughtTree.css';

const ThoughtTree = ({ thoughts, selectThought }) => {
  return (
    <div className="thought-tree">
      {thoughts.map(thought => (
        <ThoughtNode key={thought._id} thought={thought} onClick={selectThought} />
      ))}
    </div>
  );
};

export default ThoughtTree;