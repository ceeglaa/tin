import React from 'react';
import logo from './logo.svg';
import Header from './components/header/Header'
import Content from './components/content/Content'
import {BrowserRouter as Router, NavLink, Route} from 'react-router-dom';
import './App.css';

function App() {
  
  return (
    <Router>
    <div className="App">
      <div className="head">
        <Header />
      </div>
      <div className="content-pos">
        <Content />
        {/* <DrinkList /> */}
      </div>
    </div>
    </Router>
  );
}

export default App;