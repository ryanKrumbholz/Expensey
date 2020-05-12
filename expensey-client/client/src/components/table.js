import React from 'react';
import ExpenseCard  from './expense_card';
import App from '../App';
import './table.css';

const Table = props => {
  var expenseCardList =  []; //list of expenseCard components; gathered in function 'populateExpenseCards'
  var emptyCardLsContent = //Element that displays when expenseCardList is empty
  <div class="emptyCardList" onClick={props.toggleWindow}>
    <h3>Create new expense</h3>
  </div>

  async function fetchListData(expenses) {
    /**
     * Fetches filters list data for search drop downs and search boxes.
     */
    var expenses = await expenses;

    function fetchCatList(expenses) {
      /**
       * Fetches category from each expense and adds them to a list
       * that is displayed as a dropdown selector.
       */
      var catList = listData().getCatList(); //Assigned to current list of categories, which should be empty on start.
      var catMap = new Map(); //Hashmap of categories for checking if the category has already been added to the list. Also allows to maintain better runtime.
      if (expenses) {
        for (var i = 0; i <= expenses.length; i++) {
          if (expenses[i]){
            var currExpenseCat = expenses[i].category; //current expense category
            if (!catMap.has(currExpenseCat)){ 
              //checking if category is not in the hashmap.
              catMap.set(currExpenseCat); //add category to hashmap.
              catList.push(currExpenseCat); //add category to list.
            }
          }
        }
      }
      if (catList.length > props.catList.length && catList[0]) {
        //prevents infinite re-rendering by checking only changing state when categories are updated
      props.setCatList(catList)
      }
    }

    function fetchCcList(expenses) {
      /**
       * Fetches credit card display info from each expense and adds them to a list
       * that is displayed as a dropdown selector.
       */
      var ccList = listData().getCcList(); //Assigned to current list of credit cards, which should be empty on start.
      var ccMap = new Map(); //Hashmap of credit cards for checking if the category has already been added to the list. Also allows to maintain better runtime.
      if (expenses) {
        for (var i = 0; i <= expenses.length; i++) {
          if (expenses[i]){
            var currExpenseCc = expenses[i].ccData; //current credit card info
            if (!ccMap.has(currExpenseCc)) {
              //checking if credit card data is not already in the map.
              ccMap.set(currExpenseCc);
              ccList.push(currExpenseCc);
            }
          }
        }
      }
      if (ccList.length > props.ccList && ccList[0]){
        //prevents infinite re-rendering by checking only changing state when credit cards are updated
      props.setCcList(ccList)
    }
    }

    function fetchTagList(expenses) {
      /**
       * Fetches tags list from each expense and adds them to a list
       * that is displayed as a dropdown selector.
       */
      var tagList = listData().getTagList(); //Assigned to current list of credit cards, which should be empty on start.
      if (expenses) {
      for (var i = 0; i <= expenses.length; i++) {
        if (expenses[i]){
          var currExpenseTags = expenses[i].tags; //current list of tags
            if (tagList.length === 0){
              //if tag list is empty, assign it to the current tag list
              tagList = currExpenseTags
            }
            else{
              tagList.push(currExpenseTags);
            }

        }
      }
      for (var i = 0; i <= tagList.length; i++) {
        //write code to find dupe and remove it
      }
    }
    if (tagList.length > props.tagList && tagList[0]){
      //prevents infinite re-rendering
      props.setTagList(tagList)
    }
  }
    function fetchAllList(expenses) {
      /**
       * Calls all fetch functions
       */
      fetchCatList(expenses); 
      fetchCcList(expenses); 
      fetchTagList(expenses);
    }
    fetchAllList(expenses);
  }

  function listData (){
    /**
     * Encapsulates table filters lists
     */
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
    /**
     * Populate selector dropdown list with given array.
     */
    var selectLs = []; //init empty array of option elements to be returned with items from the array
    for(var i = 0; i < ls.length; i++) {
      selectLs.push(<option  class="selectli">{ls[i]}</option>)
    }
    return selectLs;
  }

  var sortByCat = async () => {
    /**
     * Sorts by user selected category.
     */
    function helper() {
      /**
       * Sorts through expenses and pushes expense with given category to cardLs.
       */
      for (var i = 0; i < expensesLocal.length; i++) {
        if (expensesLocal[i].category === currCat) {
          sortedExpenses.push(expensesLocal[i])
        }
      }
    }

    var select = document.getElementsByClassName('catList')[0] //gets list of dropdown options.
    var currCat; //To be assigned to currently selected category
    var sortedExpenses = []; //list of expenses with given category. Gets pushed to in helper function.
    if (select.options) {
      currCat = select.options[select.selectedIndex].text //assigned to user selected category
    }
    var expensesLocal = await props.expenses; //gets list of expenses from state

    helper()
    
    if (sortedExpenses.length === 0) {
      //Allows for changing the current category to another by re-assigning back to all expenses
      // and reruns helper method. 
      expensesLocal = await expenses;
      helper()
    }
    expenseCardList = []; //List of soon to be expense cards which get pushed to in following lines of code.

    if (currCat === 'Select Category'){
      //resets back to full list of expenses when default option selected
      populateExpenseCards(expenses)
    }
    else{
      //populates expenses with given category
      populateExpenseCards(sortedExpenses)
    }
    props.setExpenses(sortedExpenses) //changes state of current expenses
  }

  var sortByCC = async () => {
    /**
     * Sorts by the user selected credit card
     */
    function helper() {
      /**
       * Sorts through expenses and pushes expense with matching CC info to cardLs.
       */
      for (var i = 0; i < expensesLocal.length; i++) {
        if (expensesLocal[i].ccData === currCC) {
          sortedExpenses.push(expensesLocal[i])
        }
      }
    }

    var select = document.getElementsByClassName('ccList')[0]; //gets list of dropdown options.
    var currCC; //To be assigned to currently selected CC info
    var sortedExpenses = []; //list of expenses with given CC info. Gets pushed to in helper function.
      if (select.options) {
        currCC = select.options[select.selectedIndex].text
      }

      var expensesLocal = await props.expenses; //gets list of expenses from state
    
      helper()
    
      if (sortedExpenses.length === 0) {
        //Allows for changing the current CC info to another by re-assigning back to all expenses
      // and reruns helper method. 
        expensesLocal = await expenses;
        helper()
      }

    expenseCardList = []; //List of soon to be expense cards which get pushed to in following lines of code.

    if (currCC === 'Select Category'){
      //resets back to full list of expenses when default option selected
      populateExpenseCards(expenses)
    }
    else{
      //populates expenses with given CC info
      populateExpenseCards(sortedExpenses)
    }
    props.setExpenses(sortedExpenses) //changes state of current expenses
  }

  var sortByTag = async () => {
    /**
     * Sorts by the user selected tag.
     */
    function helper() {
      /**
       * Sorts through expenses and pushes expense with matching tag to cardLs.
       */
      for (var i = 0; i < expensesLocal.length; i++) {
        if (expensesLocal[i].tags.includes(currTag)) {
          sortedExpenses.push(expensesLocal[i])
        }
      }
    }
    var select = document.getElementsByClassName('tagList')[0]  //gets list of dropdown options.
    var currTag; //To be assigned to currently tag.
    var sortedExpenses = []; //list of expenses with given Tag. Gets pushed to in helper function.
    if (select.options) {
      currTag = select.options[select.selectedIndex].text
    }
    var expensesLocal = await props.expenses; //gets list of expenses from state
    
    helper()
    
    if (sortedExpenses.length === 0) {
      //Allows for changing the current tag to another by re-assigning back to all expenses
      // and reruns helper method. 
      expensesLocal = await expenses;
      helper()
    }
    
    expenseCardList = []; //List of soon to be expense cards which get pushed to in following lines of code.

    if (currTag === 'Select Tag'){
      //resets back to full list of expenses when default option selected
      populateExpenseCards(expenses)
    }
    else{
      
      populateExpenseCards(sortedExpenses)
    }
    props.setExpenses(sortedExpenses) //changes state of current expenses
  }

  var sortByMerch = async () => {
    /**
     * Sorts by the user selected merchant.
     */
    function helper() {
      /**
       * Sorts through expenses and pushes expense with matching merchant to cardLs.
       */
      for (var i = 0; i < expensesLocal.length; i++) {
        if (expensesLocal[i].merchant.toUpperCase() === input.toUpperCase()) {
          sortedExpenses.push(expensesLocal[i])
        }
      }
    }
    var input = document.getElementsByClassName('merchIn')[0].value  //gets value typed by user.
    var sortedExpenses = []; //list of expenses with given Merchant. Gets pushed to in helper function.
    var expensesLocal = await props.expenses; //gets list of expenses from state
    
    helper()
    
    if (sortedExpenses.length === 0) {
      //Allows for changing the current merchant to another by re-assigning back to all expenses
      // and reruns helper method. 
      expensesLocal = await expenses;
      helper()
    }

    expenseCardList = []; //List of soon to be expense cards which get pushed to in following lines of code.

    if (input === ''){
      //resets back to full list of expenses when default option selected
      populateExpenseCards(expenses)
    }
    else{
      //populates expenses with given merchant
      populateExpenseCards(sortedExpenses)
    }
    props.setExpenses(sortedExpenses) //changes state of current expenses
  }

  var sortByDate = async () => {
    /**
     * Sorts by the user selected date range
     */
    function helper() {
      /**
       * Sorts through expenses and pushes expense with dates in between upper and lower bounds.
       */
      for (var i = 0; i < expensesLocal.length; i++) {
        if (expensesLocal[i].dateNum >= lowerBound || expensesLocal[i].dateNum <= upperBound) {
          sortedExpenses.push(expensesLocal[i])
        }
      }
    }
    var lowerBound = document.getElementsByClassName('dateFrom')[0].valueAsNumber //number value of 'from' date
    var upperBound = document.getElementsByClassName('dateTo')[0].valueAsNumber//number value of 'to' date
    var sortedExpenses = []; //List of soon to be expense cards which get pushed to in following lines of code.
    var expensesLocal = await props.expenses; //gets list of expenses from state

    helper()

    if (sortedExpenses.length === 0) {
      //Allows for changing the current date range to another by re-assigning back to all expenses
      // and reruns helper method. 
      expensesLocal = await expenses;
      helper()
    }

    populateExpenseCards(sortedExpenses) //populates expenses between date range
    props.setExpenses(sortedExpenses) //changes state of current expenses

  }

  var sortByStatus = async () => { //TODO need to finish this function
    /**
     * Sorts by the user selected statuses
     */
    function helper() {
      /**
       * Checks each of checkboxes. If a checkbox is checked and expense status matches checkbox status the expense gets pushed to list.
       */
      for (var i = 0; i < expensesLocal.length; i++) {
        if(expensesLocal[i].status === unreported && props.c1 === false) {
          sortedExpenses.push(expensesLocal[i])
        }
        if(expensesLocal[i].status === open && this.c1 === false) {
          sortedExpenses.push(expensesLocal[i])
        }
        if(expensesLocal[i].status === processing && this.c1 === false) {
          sortedExpenses.push(expensesLocal[i])
        }
        if(expensesLocal[i].status === approved && this.c1 === false) {
          sortedExpenses.push(expensesLocal[i])
        }
        if(expensesLocal[i].status === reimbursed && this.c1 === false) {
          sortedExpenses.push(expensesLocal[i])
        }
        if(expensesLocal[i].status === closed && this.c1 === false) {
          sortedExpenses.push(expensesLocal[i])
        }
        if(expensesLocal[i].status === deleted && this.c1 === false) {
          sortedExpenses.push(expensesLocal[i])
        }
      }
    }

    var sortedExpenses = [];  //To be populated later by helper method; List of expenses sorted by status
    var expensesLocal = await props.expenses; //gets list of expenses from state
    var unreported = document.getElementsByClassName('c1')[0].text //String "unreported"
    var open = document.getElementsByClassName('c2')[0].text //String "open"
    var processing = document.getElementsByClassName('c3')[0].text //String "processing"
    var approved = document.getElementsByClassName('c4')[0].text //String "approved"
    var reimbursed = document.getElementsByClassName('c5')[0].text //String "reimbursed"
    var closed = document.getElementsByClassName('c6')[0].text //String "closed"
    var deleted = document.getElementsByClassName('c7')[0].text //String "deleted"

    helper()

    if (sortedExpenses.length === 0) {
      //Allows for changing the current checked statuses to another by re-assigning back to all expenses
      // and reruns helper method.
      expensesLocal = await expenses;
      helper()
    }
    populateExpenseCards(sortedExpenses) //populates expenses with checked statuses
    props.setExpenses(sortedExpenses)  //changes state of current expenses
  }

  var getCookie = cname => {
    /**
     * Gets data of local cookie of given cname
     */
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  async function fetchExpenses() {
    /**
     * Fetches expenses of given user from API.
     */
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
  /**
     * Populates expenseCardList with expense card components with given expenses.
     */
  var expenses = await expenses; //expenses from API
  if (expenses) {
    var numCards = expenses.length;
    for (var i = 0; i < numCards; i++) {
      var arr = expenses[i].date.split('-')
      var date = arr[1] + '-' + arr[2] + '-' + arr[0] //string with rearranged date into dd-mm-yyyy format
      expenseCardList.push(<ExpenseCard data = {[date, expenses[i].merchant, expenses[i].amount,
       expenses[i].category,expenses[i].description, expenses[i].tag, expenses[i].receiptImgLink, expenses[i].status]}/>)
    }
  }
  if (expenseCardList != props.currCardLs){
    //if statement prevents infinite re-rendering by only changing state when expenses update
    props.setCardLs(expenseCardList);
  }
  }

  var expenses = fetchExpenses();
  
  if (props.expenses.length === 0) {
    //changes expenses state if empty
    props.setExpenses(expenses);
  }

  if (props.currCardLs.length === 0) {
    //if expense cards are empty populate expenseCards
    populateExpenseCards(expenses);
  }

  function filters () {
    //Filters element
    return(
          <div className="filters">
            <ul class="datesFiltersList">
            <li>
              <form action="">
                <label for="From">From: </label>
                <input class="dateFrom" type="date" id="" name=""/>
              </form>
            </li>
            <li>
              <form action="">
                <label for="To">To: </label>
                <input class="dateTo" type="date" id="" name=""/>
              </form>
              <button class="submit" onClick={sortByDate}></button>
            </li>
          </ul>
          <ul class="typeFiltersList">
            <li>
                <label>
                  <input class="merchIn" type="text" placeholder="Merchant" onChange="" onSubmit="" />
                  <button class="submit" onClick={sortByMerch}></button>
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
                  <input type="checkbox" checked={props.c1} onClick={props.togglec1}/>
                  Unreported
                </label>
            </li>
            <li>
              <label class="c2">
                <input type="checkbox" checked={props.c2} onClick={props.togglec2}/>
                Open
              </label>
            </li>
            <li>
              <label class="c3">
                <input type="checkbox" checked={props.c3} onClick={props.togglec3}/>
                Processing
              </label>
            </li>
            <li>
              <label class="c4">
                <input type="checkbox" checked={props.c4} onClick={props.togglec4}/>
                Approved
              </label>
            </li>
            <li>
              <label class="c5">
                <input type="checkbox" checked={props.c5} onClick={props.togglec5}/>
                Reimbursed
              </label>
            </li>
            <li>
              <label class="c6">
                <input type="checkbox" checked={props.c6} onClick={props.togglec6}/>
                Closed
              </label>
            </li>
            <li>
              <label class="c7">
                <input type="checkbox" checked={props.c7} onClick={props.togglec7}/>
                Deleted
              </label>
            </li> 
          </ul>
        </div>
    )
  }

  function table (){
    // Table element
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

  fetchListData(expenses);

  return (
    <div>
      {filters()}
      {table()}
    </div>
  )
}

export default Table;