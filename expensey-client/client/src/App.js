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

class App extends Component {

  state = {
    seen: false,
    cardLs: [],
    dkmode: false
  };

toggleWindow = () => {
    this.setState({
      seen: !this.state.seen
    },
    console.log("Window Toggled"))
  }

toggledkMode =  () => {
  this.setState({
    dkmode: !this.state.dkmode
  },
  () => console.log("Dark Mode toggled")
  )
};

getCookie = cname => {
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
          fetch('https://api.expensey.app/users/user',requestOptions) 
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
    settings.style.color = txtColor;
    settings.style.backgroundColor = bgColor;
  }
  if (expenses) {
    expenses.style.color = txtColor;
    expenses.style.backgroundColor = bgColor;
    if (expenseCard) {
      for (var i = 0; i < expenseCard.length; i++) {
        expenseCard[i].style.backgroundColor = cardColor;
        expenseCard[i].style.color = txtColor;
      }
    }
    
  }
  if (reports) {
    reports.style.color = txtColor;
    reports.style.backgroundColor = bgColor;
  }
  if  (account) {
  account.style.color = txtColor;
  account.style.backgroundColor = bgColor;
  }
}

componentDidMount() {
  var mode = false;
  if (this.getCookie('dkModeStatus') != mode){
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
                <ExpensesBody toggleWindow = {this.toggleWindow} currSeenState = {this.state.seen} currCardLs = {this.state.cardLs} setCardLs = {this.setCardLs} dkMode = {this.getDarkMode}/> 
                {this.state.seen ? <NewExpense toggleWindow = {this.toggleWindow}/> : null}
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
