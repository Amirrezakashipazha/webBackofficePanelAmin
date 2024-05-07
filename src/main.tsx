import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import './i18n';
import { persistor, store } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
    {/* <PersistGate loading={<div>Loading.............</div>} persistor={persistor}> */}
      <>
      {console.log("main")}
      <Router>
        <App />
        <Toaster />
      </Router>
      </>
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
);
