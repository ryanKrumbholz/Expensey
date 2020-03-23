import React from 'react';
import ExpenseCard from './expense_card';
import './expenses_cardholder.css';

const expenses_cardholder = props => {
  return (
      <div className="ExpensesCardholder">
        <p>CardHolder</p>
        <ExpenseCard/>
      </div>
  )
}

export default expenses_cardholder;