import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { BrowserRouter as Router } from 'react-router-dom';
import "@fontsource/poppins"

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = extendTheme({
  styles: {
    global: {
      heading: {
        fontFamily: 'Poppins'
      },
      body: {
        transitionProperty: "all",
        transitionDuration: "normal",
        fontFamily: 'Poppins'
      }
    }
  },
  config: {
    disableTransitionOnChange: false
  }
})
root.render(
  <Router>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </Router>
  
  
);
