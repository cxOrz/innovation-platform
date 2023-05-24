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
import axios from 'axios';
import { user_get } from './configs/api';

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const snackbar = useAppSelector(selectSnackBar);
  const [userState] = useUserState();

  function handleAlertClose(event?: React.SyntheticEvent | Event, reason?: string) {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(updateSnackBar({ ...snackbar, open: false }));
  }

  useEffect(() => {
    // 将用户信息更新到redux全局状态
    if (userState) {
      dispatch(updateUser({
        uid: userState.uid,
        avatarUrl: userState.avatarUrl,
        role: userState.role,
        token: userState.token,
        phone: '', // 默认情况
        email: '' // 默认情况
      }));
      axios.get(user_get, {
        headers: { 'Authorization': userState.token ? userState.token : "" }
      }).then(res => {
        if (res.data.code === 200) {
          const result = res.data.data;
          // 只更新这俩字段
          if (result.role !== userState.role) {
            localStorage.setItem('role', result.role);
          }
          if (result.avatarUrl !== userState.avatarUrl) {
            localStorage.setItem('avatarUrl', result.avatarUrl);
          }
        } else if (res.data.code === 403) {
          // 身份过期自动退出
          dispatch(updateSnackBar({ message: '身份已过期', severity: 'error', open: true }));
          dispatch(updateUser({
            uid: userState.uid,
            avatarUrl: userState.avatarUrl,
            role: 3,
            token: ''
          }));
          localStorage.clear();
        }
      });
    }
  }, [userState]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className={styles.container}>
      <NavigationBar />
      <div className={styles.outlet}>
        <Outlet />
      </div>
      <footer>
        <p>
          Copyright © 2023 cxOrz | Apache License
        </p>
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
