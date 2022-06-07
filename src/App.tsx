import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Outlet />
    </div>
  );
}

export default App;
