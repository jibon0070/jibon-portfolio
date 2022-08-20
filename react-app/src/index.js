import React from 'react';
import ReactDOM from 'react-dom/client';

import Home from './home/home.jsx'
import './styles.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);