import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';

const Root: React.FC = () => {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<Root />);

export default Root;
