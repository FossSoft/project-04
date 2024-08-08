import React from 'react';
import ReactDOM from 'react-dom/client';
import  App from 'components/App/App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import "modern-normalize";
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename="/project-04">
        <App />
      </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
