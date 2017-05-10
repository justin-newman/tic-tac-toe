import React from 'react';

const Cell = ({ piece }) => (
  <div>
    <h3 className='center'>
      { piece }
    </h3>
  </div>
)

export default Cell;