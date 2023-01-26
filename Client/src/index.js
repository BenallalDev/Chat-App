import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { BrowserRouter as Router } from 'react-router-dom';
import "@fontsource/poppins"
import { Provider } from 'react-redux'
import { store } from './redux/store'


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
  <Provider store={store}>
    <Router>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Router>
  </Provider> 
);
