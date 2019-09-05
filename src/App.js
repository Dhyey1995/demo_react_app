import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import Homepage from './pages/Homepage.js';

function App() {
  return (
      <section>
        <Route exact path="/" component={Homepage} />
      </section>
  );
}

export default App;
