import React from 'react';
import './header.css';
import App from '../App';

const header = props => {

  //TODO fix formatting in css and link button to new expense function
  return (
      <div className="Header">
        <h2>Expenses</h2>
        <div class="btn" onClick={props.toggleWindow}>
          <p>Create new expense</p>
          <button>+</button>
        </div>
      </div>
  )
}

export default header;