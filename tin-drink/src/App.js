import React from 'react';
import logo from './logo.svg';
import Header from './components/header/Header'
import Content from './components/content/Content'
import DrinkList from './components/content/drinkList/DrinkList'
import './App.css';

function App() {
  
  return (
    <div className="App">
      <div className="head">
        <Header />
      </div>
      <div className="content-pos">
        <Content />
        <DrinkList />
      </div>
    </div>
  );
}

export default App;