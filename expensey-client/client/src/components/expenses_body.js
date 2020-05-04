import React from 'react';
import Header from './header';
import Footer from './footer';
import Table from './table';
import './expenses_body.css';

const expenses_body = props => {

  return (
      <div className="ExpensesBody">
        <Header toggleWindow = {props.toggleWindow}/>
        <Table toggleWindow = {props.toggleWindow} currCardLs = {props.currCardLs} setCardLs = {props.setCardLs}/>
        <Footer />
      </div>
  )
}

export default expenses_body;