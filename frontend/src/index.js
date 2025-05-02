import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AssignmentProvider } from './context/AssignmentContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AssignmentProvider>
      <App />
    </AssignmentProvider>
  </React.StrictMode>
);
