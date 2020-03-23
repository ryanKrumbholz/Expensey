import React from 'react';
import './header.css';

const header = props => {
  //TODO fix formatting in css and link button to new expense function
  return (
      <div className="Header">
        <h2>Expenses</h2>
        <button>New expense</button>
      </div>
  )
}

export default header;