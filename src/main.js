import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home.js';

const container = document.getElementById('container');

function renderComponent(Component) {
  ReactDOM.render(<Component />, container);
}

renderComponent(Home);

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('./home.js', () => {
    const comp = require('./home.js').default; // eslint-disable-line global-require
    renderComponent(comp);
  });
}
