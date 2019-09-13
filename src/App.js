import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage.js';
import BudgetAdd from './pages/BudgetAdd.js';
import AddNewTemplate from './pages/AddNewTemplate.js';
import SelectTemplate from './pages/SelectTemplate.js';

function App() {
  return (
      <section>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/add_new_budget" component={BudgetAdd} />
            <Route path="/select_template" component={SelectTemplate} />
            <Route path="/add_new_template" component={AddNewTemplate} />
          </Switch>
        </BrowserRouter>
      </section>
  );
}

export default App;
