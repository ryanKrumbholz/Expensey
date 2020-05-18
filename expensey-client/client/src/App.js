import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Sidebar from './components/sidebar';
import ExpensesBody from './components/expenses_body';
import Login from './login';
import NewExpense from './components/new_expense';
import './App.css';
import Construction from './components/construction';
import Settings from './components/settings_body';
import Footer from './components/footer';
import ReceiptWindow from './components/receiptWindow';
import {createStore} from 'redux';

class App extends Component {
  state = {
    seenNewExpense: false,
    seenReceiptImg: false,
    currReceiptImg: null, //state for new expense window
    cardLs: [], //state for card list
    dkmode: false, //state for dark mode
    catList: [],
    ccList: [],
    tagList: [],
    expenses: [],
    c1: true,
    c2: true,
    c3: true,
    c4: true,
    c5: true,
    c6: true, 
    c7: false
  };

toggleWindow = () => {
  //toggles new expense window
    this.setState({
      seenNewExpense: !this.state.seenNewExpense //sets seen to the opposite state
    },
    console.log("Window Toggled"))
  }

toggledkMode =  () => {
  //toggles dark mode
  this.setState({
    dkmode: !this.state.dkmode //sets dkmode  to the opposite state
  },
  () => console.log("Dark Mode toggled")
  )
};

toggleReceiptWindow = img => {
  this.setState({
    seenReceiptImg: !this.state.seenReceiptImg, //sets seen to the opposite state
    currReceiptImg: img
  },
  console.log("Window Toggled"))
};

togglec1 = () => {
  this.setState({
    c1: !this.state.c1 //sets dkmode  to the opposite state
  },
  () => console.log("c1 toggled")
  )
}

togglec2 = () => {
  this.setState({
    c2: !this.state.c2 //sets dkmode  to the opposite state
  },
  () => console.log("c2 toggled")
  )
}


togglec3 = () => {
  this.setState({
    c3: !this.state.c3 //sets dkmode  to the opposite state
  },
  () => console.log("c3 toggled")
  )
}

togglec4 = () => {
  this.setState({
    c4: !this.state.c4 //sets dkmode  to the opposite state
  },
  () => console.log("c4 toggled")
  )
}

togglec5 = () => {
  this.setState({
    c5: !this.state.c5 //sets dkmode  to the opposite state
  },
  () => console.log("c5 toggled")
  )
}

togglec6 = () => {
  this.setState({
    c6: !this.state.c6 //sets dkmode  to the opposite state
  },
  () => console.log("c6 toggled")
  )
}

togglec7 = () => {
  this.setState({
    c7: !this.state.c7 //sets dkmode  to the opposite state
  },
  () => console.log("c7 toggled")
  )
}




getCookie = cname => {
  //gets cookie of given type
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

setCardLs = cardLs => {
  this.setState({cardLs : cardLs},
    console.log("cardls updated"));
}

setTagList = tagList => {
  this.setState({tagList : tagList},
    console.log("Tag list updated"));
}

setCatList = catList => {
  this.setState({catList : catList},
    console.log("Category list updated"));
}

setCcList = ccList => {
  this.setState({ccList : ccList},
    console.log("CC list updated."));
}

setExpenses = expenses => {
  this.setState({
    expenses: expenses
  },console.log("Expenses updated."));
}


getViewMode = () => {
  var dkmode = '#121212';
  var dktxt = 'white';
  var dkCard = '#424242'
  var ltmode = 'rgb(233, 233, 233)';
  var lttxt = 'black';
  var ltCard = 'white';

  var dkmodeStatus = false; //ltmode by default
  var txtColor = lttxt;
  var bgColor = ltmode;
  var cardColor = ltCard;

  var settings = document.getElementsByClassName('settings_body')[0];
  var expenses = document.getElementsByClassName('ExpensesBody')[0];
  var reports = document.getElementsByClassName('reports_body')[0];
  var account = document.getElementsByClassName('account_body')[0];
  var expenseCard = document.getElementsByClassName('Card');
  var emptyCardList = document.getElementsByClassName('emptyCardList')[0];
  var newExpense = document.getElementsByClassName('window')[0];
  var dropField = document.getElementsByClassName('fileUp')[0];

  //get dkmode status from db
  var getDarkModeStatus = () => {
    const requestOptions =
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email : this.getCookie('email')
            })};

          if (!this.getCookie('dkModeStatus')){
            //if dkmode cookie doesn't exist, checks db for user preference
          fetch('https://localhost:9000/users/user',requestOptions) 
              .then(res => res.json())
              .then (data => 
                {
                  document.cookie = "dkModeStatus="+data.dkModeStatus;
                })
              .catch(error => console.log(error));
          }
}

  getDarkModeStatus();
  dkmodeStatus = this.getCookie('dkModeStatus');

  if (dkmodeStatus  == 'true') {
    txtColor = dktxt;
    bgColor = dkmode;
    cardColor = dkCard;
  }

  if (settings) {
    //checks if settings is defined (sees if it is currently displayed)
    settings.style.color = txtColor;
    settings.style.backgroundColor = bgColor;
  }
  if (expenses) {
    //checks if expenses is defined (sees if it is currently displayed)
    expenses.style.color = txtColor;
    expenses.style.backgroundColor = bgColor;
    
    if (emptyCardList) {
    emptyCardList.style.backgroundColor = cardColor;
  }
    if (expenseCard) {
      for (var i = 0; i < expenseCard.length; i++) {
        //changing style of each card elem
        expenseCard[i].style.backgroundColor = cardColor;
        expenseCard[i].style.color = txtColor;
      }
    }
    
  }
  if (reports) {
    //checks if reports is defined (sees if it is currently displayed)
    reports.style.color = txtColor;
    reports.style.backgroundColor = bgColor;
  }
  if  (account) {
    //checks if account is defined (sees if it is currently displayed)
  account.style.color = txtColor;
  account.style.backgroundColor = bgColor;
  }

  if (newExpense) {
    newExpense.style.color = txtColor;
    newExpense.style.backgroundColor = bgColor;
    dropField.style.backgroundColor = cardColor;
  }
}

componentDidMount() {
  var mode = false;
  if (this.getCookie('dkModeStatus') != mode){
    //if  cookie exist; prevents from having to wait on db query
      if (this.getCookie('dkModeStatus') == 'true'){
        mode = true
      }
}
  this.setState({
    dkmode: mode
  });
}

componentDidUpdate() {
  console.log("component updated")
}


  render () {
    if(this.getCookie("status") == "true"){
      return(
        <div class="App">
        {this.getViewMode()}
          {/* Construction is temp for production*/}
          {/* <Construction/> */}
          <Sidebar/>
          <Router>
            <Switch>
              <Route path="/" exact component={ExpensesBody}>
                <ExpensesBody toggleWindow = {this.toggleWindow} currSeenState = {this.state.seen} currCardLs = {this.state.cardLs} setCardLs = {this.setCardLs} 
                dkMode = {this.getDarkMode} catList = {this.state.catList} ccList = {this.state.ccList} tagList = {this.state.tagList}
                  setCatList = {this.setCatList} setTagList = {this.setTagList} setCcList = {this.setCcList} expenses={this.state.expenses}
                   setExpenses = {this.setExpenses} c1 ={this.state.c1} c2 = {this.state.c2} c3 = {this.state.c3} c4 ={this.state.c4} c5 ={this.state.c5}
                    c6 = {this.state.c6} c7 = {this.state.c7} togglec1 ={this.togglec1} togglec2 ={this.togglec2} togglec3 ={this.togglec3} togglec4 ={this.togglec4}
                    togglec5 ={this.togglec5} togglec6 ={this.togglec6} togglec7 ={this.togglec7} toggleReceiptImg = {this.toggleReceiptWindow}

                    /> 
                {this.state.seenNewExpense ? <NewExpense toggleWindow = {this.toggleWindow}/>: null}
                {this.state.seenReceiptImg  ? <ReceiptWindow toggleReceiptImg = {this.toggleReceiptWindow} currReceiptImg = {this.state.currReceiptImg}/>: null}

              </Route>
              <Route path="/reports" exact component={Construction}>
              </Route>
              <Route path="/settings" exact component={Settings}>
              <Settings dkModeStatus = {this.state.dkmode} toggledkmode = {this.toggledkMode}/>
              </Route>
              <Route path="/account" exact component={Construction}>
              </Route>
            </Switch>
          </Router>
          <Footer/>
        </div>
    );}
    else{
      return(
        <Login/>
      );
    }
  }
}

export default App;
