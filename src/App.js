import React, { Component } from 'react';
import Sidebar from './components/sidebar'
import ExpensesBody from './components/expenses_body'
import './App.css';

 class App extends Component {
  render () {
    return(
      <div class="App">
        <Sidebar/>
        <ExpensesBody /> {/* will add function to switch between reports and this */}
      </div>
    );
  }

  
}

export default App;
