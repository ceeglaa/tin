import React from 'react';
import logo from './logo.svg';
import Header from './components/header/Header'
import Content from './components/content/Content'
import Breadcrumbs from './components/breadcrumbs/Breadcrumbs'
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';

class App extends React.Component {

  state = {
    path: [{
      link: '/',
      title: 'Strona główna'
  }]
}

  renderApp = () => {
    this.forceUpdate();
  }

  setBreadcrumbs = newpath => {
    if(this.state.path !== newpath) {
      this.setState({
        path: newpath
      })
    }
  }

  render () {
    return (
      <BrowserRouter>
      <meta charset="utf-8"></meta>
      <div className="App">
        <div className="head">
        <Route path="/" component={Header} />
        </div>
        <div className="breadcrumb-pos">
          <Route path="/" component={() => <Breadcrumbs path={this.state.path}/>} />
        </div>
        <div className="content-pos">
          <Content render={this.renderApp.bind(this)} setPath={this.setBreadcrumbs.bind(this)} />
        </div>
      </div>
      </BrowserRouter>
    );
}
}
export default App;