import React from 'react';
import ExpenseCard  from './expense_card';
import App from '../App';
import './table.css';

const Table = props => {
  var expenseCardList =  [];
  var emptyCardLsContent = <div class="emptyCardList" onClick={props.toggleWindow}>
                            <h3>Create new expense</h3>
                          </div>

  async function fetchListData(expenses) {
    var expenses = await expenses;
    function fetchCatList(expenses) {
      var catList = listData().getCatList();
      if (expenses) {
        for (var i = 0; i <= expenses.length; i++) {
          if (expenses[i]){
            var currExpenseCat = expenses[i].category;
            if (!catList.includes(currExpenseCat)) {
              catList.push(currExpenseCat);
            }
          }
        }
      }
      if (catList.length > props.catList.length && catList[0]) {
        //prevents infinite re-rendering
      props.setCatList(catList)
      }
    }

    function fetchCcList(expenses) {
      var ccList = listData().getCcList();
      if (expenses) {
        for (var i = 0; i <= expenses.length; i++) {
          if (expenses[i]){
            var currExpenseCc = expenses[i].ccData;
            if (!ccList.includes(currExpenseCc)) {
              ccList.push(currExpenseCc);
            }
          }
        }
      }
      if (ccList.length > props.ccList && ccList[0]){
        //prevents infinite re-rendering
      props.setCcList(ccList)
    }
    }

    function fetchTagList(expenses) {
      var tagList = listData().getTagList();
      if (expenses) {
      for (var i = 0; i <= expenses.length; i++) {
        if (expenses[i]){
          var currExpenseTag = expenses[i].tag;
          if (!tagList.includes(currExpenseTag)) {
            tagList.push(currExpenseTag);
          }
        }
      }
    }
    if (tagList.length > props.tagList && tagList[0]){
      //prevents infinite re-rendering
      props.setTagList(tagList)
    }
  }
    function fetchAllList(expenses) {
      fetchCatList(expenses); 
      fetchCcList(expenses); 
      fetchTagList(expenses);
    }
    fetchAllList(expenses);
  }

  function listData (){
    var tagList = [];
    var categoriesList = [];
    var ccList = [];

    return {
      setTagList : function (newTagList) {
        tagList = newTagList;
      },
      setCatList : function (newCatList) {
        categoriesList = newCatList;
      },
      setCcList : function (newCcList) {
        ccList = newCcList;
      },
      getCatList : function () {
        return categoriesList;
      },
      getCcList : function () {
        return  ccList;
      },
      getTagList : function () {
        return tagList;
      }
    };
  }

  var populateSelectList = (ls) => {
    var selectLs = [];
    for(var i = 0; i < ls.length; i++) {
      selectLs.push(<option  class="selectli">{ls[i]}</option>)
    }
    return selectLs;
  }

  var sortByCat = async () => {
    var select = document.getElementsByClassName('catList')[0]
    var currCat;
    var sortedExpenses = [];
    if (select.options) {
      //gets current selected category
      currCat = select.options[select.selectedIndex].text
    }
    var expensesLocal = await expenses;
    
    for (var i = 0; i < expensesLocal.length; i++) {
      if (expensesLocal[i].category === currCat) {
        sortedExpenses.push(expensesLocal[i])
      }
    }
    expenseCardList = [];

    if (currCat === 'Select Category'){
      //resets back to full list of expenses when default option selected
      populateExpenseCards(expenses)
    }
    else{
      populateExpenseCards(sortedExpenses)
    }
  }

  var sortByCC = async () => {
    var select = document.getElementsByClassName('ccList')[0]
    var currCC;
    var sortedExpenses = [];
      if (select.options) {
        currCC = select.options[select.selectedIndex].text
      }

      var expensesLocal = await expenses;
    
    for (var i = 0; i < expensesLocal.length; i++) {
      if (expensesLocal[i].category === currCC) {
        sortedExpenses.push(expensesLocal[i])
      }
    }
    expenseCardList = [];

    if (currCC === 'Select Category'){
      //resets back to full list of expenses when default option selected
      populateExpenseCards(expenses)
    }
    else{
      populateExpenseCards(sortedExpenses)
    }

  }

  var sortByTag = async () => {
    var select = document.getElementsByClassName('tagList')[0]
    var currTag;
    var sortedExpenses = [];
    if (select.options) {
      currTag = select.options[select.selectedIndex].text
    }
    var expensesLocal = await expenses;
    
    for (var i = 0; i < expensesLocal.length; i++) {
      if (expensesLocal[i].category === currTag) {
        sortedExpenses.push(expensesLocal[i])
      }
    }
    expenseCardList = [];

    if (currTag === 'Select Tag'){
      //resets back to full list of expenses when default option selected
      populateExpenseCards(expenses)
    }
    else{
      populateExpenseCards(sortedExpenses)
    }


  }

  function filters () {
    return(
          <div className="filters">
            <ul class="datesFiltersList">
            <li>
              <form action="">
                <label for="From">From: </label>
                <input type="date" id="" name=""/>
              </form>
            </li>
            <li>
              <form action="">
                <label for="To">To: </label>
                <input type="date" id="" name=""/>
              </form>
            </li>
          </ul>
          <ul class="typeFiltersList">
            <li>
                <label>
                  <input class="merchIn" type="text" placeholder="Merchant" onChange="" onSubmit="" />
                </label>
          </li>
          </ul>
          <ul class="categoryTagList">
            <li>
              <select class="catList" onChange={sortByCat}>
              <option value="" selected>Select Category</option>
                {populateSelectList(props.catList)}
              </select>
            </li>
            <li>
              <select class="ccList" onChange={sortByCC}>
              <option value="" selected>Select Card</option>
              {populateSelectList(props.ccList)}
              </select>
            </li>
            <li>
              <select class="tagList" onChange={sortByTag}>
              <option value="" selected>Select Tag</option>
              {populateSelectList(props.tagList)}
              </select>
            </li>
          </ul>
          <ul class="statusList">
            <li>
                <label class="c1">
                  <input type="checkbox" checked="checked"/>
                  <span class="checkmark"></span>
                  Unreported
                </label>
            </li>
            <li>
              <label class="c2">
                <input type="checkbox" checked="checked"/>
                <span class="checkmark"></span>
                Open
              </label>
            </li>
            <li>
              <label class="c3">
                <input type="checkbox" checked="checked"/>
                <span class="checkmark"></span>
                Processing
              </label>
            </li>
            <li>
              <label class="c4">
                <input type="checkbox" checked="checked"/>
                <span class="checkmark"></span>
                Approved
              </label>
            </li>
            <li>
              <label class="c5">
                <input type="checkbox" checked="checked"/>
                <span class="checkmark"></span>
                Reimbursed
              </label>
            </li>
            <li>
              <label class="c6">
                <input type="checkbox" checked="checked"/>
                <span class="checkmark"></span>
                Closed
              </label>
            </li>
            <li>
              <label class="c7">
                <input type="checkbox"/>
                <span class="checkmark"></span>
                Deleted
              </label>
            </li> 
          </ul>
        </div>
    )
  }

  var getCookie = cname => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  async function fetchExpenses() {
    var userEmail = getCookie("email");
    const requestOptions =
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email : userEmail
      })};

      var data = await fetch('https://api.expensey.app/users/expenses',requestOptions) 
          .then(res => res.json())
          .then (data => 
            {
              return data
            })
          .catch(error => console.log(error));

      return data
      }

async function populateExpenseCards (expenses) {
  var expenses = await expenses;
  if (expenses) {
    var numCards = expenses.length;
    for (var i = 0; i < numCards; i++) {
      expenseCardList.push(<ExpenseCard data = {[expenses[i].date, expenses[i].merchant, expenses[i].amount, expenses[i].category,expenses[i].description, expenses[i].tag, expenses[i].receiptImgLink, expenses[i].status]}/>)
    }
  }
  if (expenseCardList != props.currCardLs){
    //if statement prevents infinite re-rendering by only changing state when expenses update
    props.setCardLs(expenseCardList);
  }
  
  }

  var expenses = fetchExpenses();
  if (props.currCardLs.length == 0) {
    populateExpenseCards(expenses);
  }
  fetchListData(expenses);

  function table (){
    return(
      <div class="table">
        <ul class="theader">
          <li class="dateli">Date</li>
          <li class="statusli">Status</li>
          <li class="merchli">Merchant</li>
          <li class="amountli">Amount</li>
          <li class="catli">Category</li>
          <li class="descli">Description</li>
        </ul>
        <div class="tbody">
        {(props.currCardLs != 0) ? props.currCardLs : emptyCardLsContent }
        </div>
      </div>
    );
  }

  return (
    <div>
      {filters()}
      {table()}
    </div>
  )
}

export default Table;