import React from 'react';
import ReactDOM from 'react-dom/client';
import './static/styles/pages/index.css';
import App from './App';
import TagManager from 'react-gtm-module';

const tagManagerArgs = {
  gtmId: 'G-DF08RM7MCG' // App specific. Needs to be updated for usage in other sites or analytics blend.
}
TagManager.initialize(tagManagerArgs);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// import reportWebVitals from './reportWebVitals';
// reportWebVitals();
// reportWebVitals(console.log);
