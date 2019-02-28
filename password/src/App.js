import React, { Component } from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from './components/Landing';
import './App.css';
import Add from './components/Add';
import Edit from './components/Edit';


class App extends Component {
  render() {
    return (
      <BrowserRouter>  
        <Switch>
          <Route exact path="/" component={Landing} />  
          <Route path="/add" component={Add} />   
          <Route path='/edit/:website' component={ Edit } />    
        </Switch> 
      </BrowserRouter>
    );
  }
}

export default App;
