import React from 'react';
import Header from './header';
import Footer from './footer';
import Table from './table';
import './expenses_body.css';

const expenses_body = props => {

  return (
      <div className="ExpensesBody">
        <Header toggleWindow = {props.toggleWindow}/>
        <Table toggleWindow = {props.toggleWindow} currCardLs = {props.currCardLs} setCardLs = {props.setCardLs}
          catList = {props.catList} ccList = {props.ccList} tagList = {props.tagList}
                  setCatList = {props.setCatList} setTagList = {props.setTagList} setCcList = {props.setCcList}
                  setExpenses = {props.setExpenses} expenses = {props.expenses}
                  c1 ={props.c1} c2 = {props.c2} c3 = {props.c3} c4 ={props.c4} c5 ={props.c5}
                    c6 = {props.c6} c7 = {props.c7} togglec1 ={props.togglec1} togglec2 ={props.togglec2} togglec3 ={props.togglec3} togglec4 ={props.togglec4}
                    togglec5 ={props.togglec5} togglec6 ={props.togglec6} togglec7 ={props.togglec7}
                  />
      </div>
  )
}
export default expenses_body;