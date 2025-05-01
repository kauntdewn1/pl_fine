import React from 'react';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppContext';
import AppRoutes from './routes';

function App() {
  return (
    <AppProvider>
      <Toaster position="top-right" />
      <AppRoutes />
    </AppProvider>
  );
}

export default App;