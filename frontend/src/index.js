import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Comparación para detectar múltiples versiones de React
window.React1 = require('react');
require('react-dom');
window.React2 = require('react');
console.log('React1 y React2 son iguales:', window.React1 === window.React2);

console.log('React1 y React2 son iguales:', window.React1 === window.React2);

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
