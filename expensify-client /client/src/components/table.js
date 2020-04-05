import React from 'react';
import ExpenseCard  from './expense_card';
import './table.css';

const Table = props => {
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
          <div className="Filters">
            <ul class="DatesFiltersList">
            <li>
              <form action="">
                <label for="From">From:</label>
                <input type="date" id="" name=""/>
                <input type="submit"/>
              </form>
            </li>
            <li>
              <form action="">
                <label for="To">To:</label>
                <input type="date" id="" name=""/>
                <input type="submit"/>
              </form>
            </li>
          </ul>
          <ul class="TypeFiltersList">
            <li>
              <form onSubmit="">
                <label>
                  <input type="text" value="Merchant" onChange="" />
                </label>
                <input type="submit" value="Submit" />
            </form>
          </li>
            <li>
              <button>idk rn</button>
            </li>
          </ul>
          <ul class="CategoryTagList">
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
          <ul class="StatusList">
            <li>
              <label class="container">Unreported
                <input type="checkbox" checked="checked"/>
                <span class="checkmark"></span>
              </label>
            </li>
            <li>
              <label class="container">Open
                <input type="checkbox" checked="checked"/>
                <span class="checkmark"></span>
              </label>
            </li>
            <li>
              <label class="container">Processing
                <input type="checkbox" checked="checked"/>
                <span class="checkmark"></span>
              </label>
            </li>
            <li>
              <label class="container">Approved
                <input type="checkbox" checked="checked"/>
                <span class="checkmark"></span>
              </label>
            </li>
            <li>
              <label class="container">Reimbursed
                <input type="checkbox" checked="checked"/>
                <span class="checkmark"></span>
              </label>
            </li>
            <li>
              <label class="container">Closed
                <input type="checkbox" checked="checked"/>
                <span class="checkmark"></span>
              </label>
            </li>
            <li>
              <label class="container">Deleted
                <input type="checkbox" checked=""/>
                <span class="checkmark"></span>
              </label>
            </li> 
          </ul>
        </div>
    )
  }

  function populateExpenseCards () {
    //TODO after figuring out database schema, rewrite this algo to get card info
    var expenseCardList =  []
    var numCards = 10; //TODO  get number of cards from user account 
    for (var i = 0; i < numCards; i++) {
      expenseCardList.push(<ExpenseCard data = {["1/20/20", "Uber", "$100", "Transp","add comment", "tag", "img link"]}/>)
    }
    return(
      expenseCardList
    );
  }

  function table (){
    return(
      <div class="table">
        <ul class="theader">
          <li>Date</li>
          <li>Merchant</li>
          <li>Amount</li>
          <li>Category</li>
          <li>Description</li>
        </ul>
        <div class="tbody">
        {populateExpenseCards()}
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