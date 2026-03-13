import React from 'react';
import { LandingPage } from './components/LandingPage';

const App: React.FC = () => {
  return (
    <LandingPage 
      onLogin={() => window.location.href = '/login'} 
      onRegister={() => window.location.href = '/register'} 
    />
  );
};

export default App;
