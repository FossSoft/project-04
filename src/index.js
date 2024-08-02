import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App/App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import "modern-normalize";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/project-04">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
