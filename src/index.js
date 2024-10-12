 // index.js or main.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Adjust the path if necessary
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'; // En

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>
);

