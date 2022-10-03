import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavigationBar from './components/NavigationBar/NavigationBar';
import styles from './App.module.css';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { updateUser } from './stores/user/userSlice';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { selectSnackBar, updateSnackBar } from './stores/snackbar/snackbarSlice';
import useUserState from './hooks/useUserstate';

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const snackbar = useAppSelector(selectSnackBar);
  const [userState] = useUserState();

  function handleAlertClose(event?: React.SyntheticEvent | Event, reason?: string) {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(updateSnackBar({ ...snackbar, open: false }))
  }

  useEffect(() => {
    // 将用户信息更新到redux全局状态
    if (userState) {
      dispatch(updateUser({
        phone: userState.phone,
        email: userState.email,
        uid: userState.uid,
        openid: userState.openid,
        avatarUrl: userState.avatarUrl,
        nickName: userState.nickName,
        role: Number(userState.role),
        token: userState.token
      }));
    }
  }, [userState])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname]);

  return (
    <div className={styles.container}>
      <NavigationBar />
      <div className={styles.outlet}>
        <Outlet />
      </div>
      <footer>
        Copyright © 2022 cxOrz | Apache License
      </footer>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
