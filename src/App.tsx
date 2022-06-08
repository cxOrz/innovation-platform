import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import styles from './App.module.css'

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <div className={styles.outlet}>
        <Outlet />
      </div>
      {/* <hr className={styles.hr} /> */}
      <footer>
        Copyright © 2022 miaochenxi | Apache License
      </footer>
    </div>
  );
}

export default App;
