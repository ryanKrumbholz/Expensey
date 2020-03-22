import React from 'react';
import './header.css';

const header = props => {
  return (
      <div className="Header">
        <h2>Expenses</h2>
        <button>New expense</button>
      </div>
  )
}

export default header;