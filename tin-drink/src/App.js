import React from 'react';
import logo from './logo.svg';
import Header from './components/header/Header'
import Content from './components/content/Content'
import './App.css';

function App() {
  
  return (
    <div className="App">
      <div className="head">
        <Header />
      </div>
      <div className="content-pos">
        <Content />
      </div>
    </div>
  );
}

export default App;