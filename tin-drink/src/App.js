import React from 'react';
import logo from './logo.svg';
import Header from './components/header/Header'
import Content from './components/content/Content'
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';

class App extends React.Component {

  renderApp = () => {
    this.forceUpdate();
  }

  rerenderHeader = () => {
    this.forceUpdate();
}
  render () {
    return (
      <BrowserRouter>
      <div className="App">
        <div className="head">
        <Route path="/" component={Header} />
          {/* <Header /> */}
        </div>
        <div className="content-pos">
          <Content render={this.renderApp.bind(this)}/>
          {/* <DrinkList /> */}
        </div>
      </div>
      </BrowserRouter>
    );
}
}
export default App;