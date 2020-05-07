import React from 'react';
import ExpenseCard  from './expense_card';
import App from '../App';
import './table.css';

const Table = props => {
  var expenseCardList =  [];
  var emptyCardLsContent = <div class="emptyCardList" onClick={props.toggleWindow}>
                            <h3>Create new expense</h3>
                          </div>

  //TODO connect database and table and finish writing appropriate functions
  function fetchListData(databaseVar /* temp var name for whatever I end up passing here */) {
    function fetchCatList(databaseListItems) {
      for (var i = 0; i <= databaseListItems.length(); i++) {
        listData.setCatList(databaseListItems[i]);
      }
    }
    function fetchCcList(databaseListItems) {
      for (var i = 0; i <= databaseListItems.length(); i++) {
        listData.setCctList(databaseListItems[i]);
      }
    }
    function fetchTagList(databaseListItems) {
      for (var i = 0; i <= databaseListItems.length(); i++) {
        listData.setTagList(databaseListItems[i]);
      }
    }
    function fetchAllList() {
      fetchCatList(); 
      fetchCcList(); 
      fetchTagList();
    }
    fetchAllList();
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
      getCategoriesList : function () {
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
              <form onSubmit="">
                <label>
                  <input type="text" placeholder="Merchant" onChange="" />
                </label>
                <button class="submit" type="submit">🔍</button>
            </form>
          </li>
            <li>
              <button>idk rn</button>
            </li>
          </ul>
          <ul class="categoryTagList">
            <li>
              <select>
                {listData.getCategoriesList}
              </select>
            </li>
            <li>
              <select>
                {listData.getTagList}
              </select>
            </li>
            <li>
              <select>
                {listData.getCcList}
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

      populateExpenseCards(data);
      }

function populateExpenseCards (expenses) {
  if (expenses) {
    var numCards = expenses.length;
    for (var i = 0; i < numCards; i++) {
      expenseCardList.push(<ExpenseCard data = {[expenses[i].date, expenses[i].merchant, expenses[i].amount, expenses[i].category,expenses[i].description, expenses[i].tag, expenses[i].receiptImgLink, expenses[i].status]}/>)
    }
    props.setCardLs(expenseCardList);
  }
  }

  fetchExpenses();
  

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