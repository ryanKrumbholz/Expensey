import React from 'react';
import ExpenseCard from './expense_card';
import Filters from './filters';
import './expenses_cardholder.css';

const expenses_cardholder = props => {

  //TODO write JS for card list and create sorting functions
  return (
      <div class="ExpensesCardSection">
        <div class="CardholderSort">

        </div>
        <div class="ExpenseCardHolder">
          <ExpenseCard/>
        </div>
      </div>
  )
}

export default expenses_cardholder;