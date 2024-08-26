import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>

    
  </React.StrictMode>
);


