import React from 'react';
import './App.css';

import { ThemeProvider } from '@mui/material';
import { theme } from './mui/theme';
import { Provider } from 'react-redux';
import store from './state/store';
import { DrawAfterFirstUserInitialize } from './DrawAfterFirstUserInitialize';
import { AppRouter } from './AppRouter';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <DrawAfterFirstUserInitialize>
          <AppRouter/>
        </DrawAfterFirstUserInitialize>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
