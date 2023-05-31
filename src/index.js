import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from "@material-tailwind/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <ThemeProvider>
     <ChakraProvider>
      <Provider store={store}>
    <App />
    </Provider>
    </ChakraProvider>
    </ThemeProvider>
  </React.StrictMode>
);

