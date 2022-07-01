import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import styles from './App.module.css'
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { tcb_auth, tcb_db } from './configs/global';
import { updateUser } from './stores/user/userSlice';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { selectSnackBar, updateSnackBar } from './stores/snackbar/snackbarSlice';

function App() {
  const dispatch = useAppDispatch()
  const snackbar = useAppSelector(selectSnackBar)
  const userState = tcb_auth.hasLoginState()?.user

  function handleAlertClose(event?: React.SyntheticEvent | Event, reason?: string) {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(updateSnackBar({ ...snackbar, open: false }))
  }

  useEffect(() => {
    // 将用户信息更新到redux全局状态
    if (userState) {
      tcb_db.collection('inno-user').where({
        uid: userState.uid
      }).get().then((res) => {
        dispatch(updateUser({
          phone: (userState as any).phone,
          uid: userState?.uid,
          avatarUrl: userState?.avatarUrl,
          nickName: userState?.nickName,
          gender: userState?.gender,
          role: res.data[0]?.role
        }))
      })
    } else {

    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [window.location.pathname])

  return (
    <div className="App">
      <NavigationBar />
      <div className={styles.outlet}>
        <Outlet />
      </div>
      <footer>
        Copyright © 2022 miaochenxi | Apache License
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
