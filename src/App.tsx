import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import styles from './App.module.css'
import { useAppDispatch } from './hooks/redux';
import { tcb_auth } from './configs/global';
import { updateUser } from './stores/user/userSlice';

function App() {
  const dispatch = useAppDispatch()
  const userState = tcb_auth.currentUser

  useEffect(() => {
    // 将用户信息更新到redux全局状态
    dispatch(updateUser({
      phone: (userState as any).phone,
      avatarUrl: userState?.avatarUrl,
      nickName: userState?.nickName
    }))
  }, [])

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
