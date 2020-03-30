import React from 'react';
import Header from './header';
import Footer from './footer';
import Filters from './filters';
import ExpensesCardholder from './expenses_cardholder';
import './expenses_body.css';

const expenses_body = props => {
  return (
      <div className="ExpensesBody">
        <Header />
        <Filters />
        <ExpensesCardholder />
        <Footer />
      </div>
  )
}

export default expenses_body;