import React, { Component } from 'react';
import Sidebar from './components/sidebar';
import ExpensesBody from './components/expenses_body';
import Login from './login';
import NewExpense from './components/new_expense';
import './App.css';
import Construction from './components/construction';

class App extends Component {

  state = {
    seen: false,
    cardLs: []
  };

toggleWindow = () => {
    this.setState({
      seen: !this.state.seen
    });
    console.log("Window Toggled");
  }

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
  this.setState({cardLs : cardLs});
}

  render () {
    if(this.getCookie("status") == "true"){return(
        <div class="App">
          {/* Construction is temp for production*/}
          {/* <Construction/> */}
          <Sidebar/>
          <ExpensesBody toggleWindow = {this.toggleWindow} currSeenState = {this.state.seen} currCardLs = {this.state.cardLs} setCardLs = {this.setCardLs}/> 
          {this.state.seen ? <NewExpense toggleWindow = {this.toggleWindow}/> : null}
        </div>
      // </Router>
    );}
    else{
      return(
        <Login/>
      );
    }
  }
}

export default App;
