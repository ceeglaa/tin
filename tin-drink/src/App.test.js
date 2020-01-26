import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

function stupidFunction(x) {
  var y = x+5;
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
