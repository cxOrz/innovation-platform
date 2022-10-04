import React, { useRef, useState } from 'react'
import axios from 'axios';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import styles from './Login.module.css'
import { user_create, user_login, user_verification_email_ } from '../../configs/api';
import { useDispatch } from 'react-redux';
import { updateSnackBar } from '../../stores/snackbar/snackbarSlice';

interface Props { }

interface InputRefs {
  email: HTMLInputElement | null,
  verifyCode: HTMLInputElement | null,
  password: HTMLInputElement | null
}

const Login = (props: Props) => {
  const [loginFormStatus, setLoginFormStatus] = useState({
    login: 1,
    labelText: '新用户注册',
    btnText: '登录'
  })
  const [inputError, setInputError] = useState({
    email: false,
    verifyCode: false,
    password: false
  })
  const [countDown, setCountDown] = useState<string | number>('发送')
  const refs = useRef<InputRefs>({
    email: null,
    verifyCode: null,
    password: null
  })
  const dispatch = useDispatch();
  let interval: NodeJS.Timer

  async function SendVerifyCode() {
    if (refs.current.email!.value.match(/^[\w.]{2,25}\@[\w]{0,20}\.[\w]{0,10}$/g)) {
      setInputError((prev) => {
        return { ...prev, email: false };
      });
      const result = (await axios.get(user_verification_email_ + encodeURIComponent(refs.current.email!.value))).data;
      if (result.code === 201) {
        // 发送成功
        setCountDown(60);
        interval = setInterval(() => {
          setCountDown(prev => {
            if (prev === 0) {
              clearInterval(interval);
              return '发送';
            }
            return (prev as number - 1);
          })
        }, 1000);
      } else {
        // 发送失败
        dispatch(updateSnackBar({ message: result.data, severity: 'warning', open: true }));
      }
    } else {
      setInputError((prev) => {
        return { ...prev, email: true };
      })
    }
  }

  // 登录或注册
  function loginOrRegister() {
    let error = 0;
    switch (loginFormStatus.login) {
      case 1: {
        if (!refs.current.email!.value.match(/^[\w.]{2,25}\@[\w]{0,20}\.[\w]{0,10}$/g)) {
          setInputError((prev) => { return { ...prev, email: true } });
          error = 1;
        }
        if (refs.current.password!.value === '') {
          setInputError((prev) => { return { ...prev, password: true } });
          error = 1;
        }
        if (error === 0) {
          axios.post(user_login, {
            email: refs.current.email!.value,
            password: refs.current.password!.value
          }).then((res) => {
            if (res.data.code === 200) {
              localStorage.setItem('uid', res.data.data.uid);
              localStorage.setItem('phone', res.data.data.phone);
              localStorage.setItem('avatarUrl', res.data.data.avatarUrl);
              localStorage.setItem('nickName', res.data.data.nickName);
              localStorage.setItem('email', res.data.data.email);
              localStorage.setItem('openid', res.data.data.openid);
              localStorage.setItem('role', String(res.data.data.role));
              localStorage.setItem('token', res.data.data.token);
              setInputError({ email: false, verifyCode: false, password: false });
              window.location.reload();
            } else {
              dispatch(updateSnackBar({ message: '登陆失败', severity: 'error', open: true }));
              setInputError((prev) => { return { ...prev, password: true } });
            }
          });
        }
        break;
      }
      case 0: {
        if (!refs.current.email!.value.match(/^[0-9]{11}$/g)) {
          setInputError((prev) => { return { ...prev, email: true } });
          error = 1;
        }
        if (!refs.current.verifyCode!.value.match(/^[0-9]{6}$/g)) {
          setInputError((prev) => { return { ...prev, verifyCode: true } });
          error = 1;
        }
        if (!refs.current.password!.value.match(/^[\S]{6,20}$/g)) {
          setInputError((prev) => { return { ...prev, password: true } });
          error = 1;
        }
        if (error === 0) {
          axios.post(user_create, {
            code: refs.current.verifyCode!.value,
            email: refs.current.email!.value,
            password: refs.current.password!.value
          }).then((res) => {
            if (res.data.code === 201) {
              dispatch(updateSnackBar({ message: '注册成功，现在可以登录', severity: 'success', open: true }));
              setLoginFormStatus((prev) => {
                return { ...prev, login: 1 };
              });
              setInputError({ email: false, verifyCode: false, password: false });
            } else {
              dispatch(updateSnackBar({ message: '注册失败', severity: 'error', open: true }));
            }
          });
        }
      }
    }
  }

  return (
    <>
      <header className={styles.head_section}>
        <h1 className={styles.hero_title}>登录你的账户</h1>
        <p className={styles.hero_paragraph}>
          登录以获得完整的门户使用体验，你可以注册并提交自己的应用，也可以申请成为我们的一员。如果没有账户，建议你注册以获得基础权限，开放更多功能。
        </p>
      </header>
      <main className={styles.main_content}>
        <Box className={styles.card} sx={{
          '& .MuiTextField-root': { mx: 1, my: 0.2 }
        }}>
          <TextField inputRef={ref => { refs.current.email = ref }} id="email" error={inputError.email}
            helperText={inputError.email ? '请输入正确的邮箱' : ' '} label="邮箱" variant="outlined" />
          {
            loginFormStatus.login === 0 ?
              <>
                <FormControl error={inputError.verifyCode} sx={{ mx: 1, my: 0.2 }} variant="outlined">
                  <InputLabel htmlFor="verify-code">验证码</InputLabel>
                  <OutlinedInput
                    id="verify-code"
                    inputRef={ref => refs.current.verifyCode = ref}
                    type='text'
                    endAdornment={
                      <InputAdornment position="end">
                        <Button disableRipple disabled={countDown !== '发送'} sx={{ fontSize: '1rem', color: 'black' }} onClick={SendVerifyCode}>{countDown}</Button>
                      </InputAdornment>
                    }
                    label="验证码"
                  />
                  <FormHelperText>{inputError.verifyCode ? '请输入正确的验证码' : ' '}</FormHelperText>
                </FormControl>
                <TextField inputRef={ref => { refs.current.password = ref }} id="password" error={inputError.password}
                  helperText={inputError.password ? '密码为长度6-20的字母、数字和符号组合' : ' '} label="设置密码" variant="outlined" />
              </>
              :
              <TextField inputRef={ref => { refs.current.password = ref }} id="password" type='password' error={inputError.password}
                helperText={inputError.password ? '邮箱或密码错误' : ' '} label="密码" variant="outlined" />
          }
          <hr className={styles.hr} />
          <span style={{ margin: '0.5rem 0' }} className={styles.clickable_text}
            onClick={() => {
              if (loginFormStatus.login === 0)
                setLoginFormStatus({ login: 1, labelText: '新用户注册', btnText: '登录' })
              else
                setLoginFormStatus({ login: 0, labelText: '使用密码登录', btnText: '注册' })
            }}
          >
            {loginFormStatus.labelText}
          </span>
          <Button variant='contained' disableElevation sx={{
            m: '0.5rem',
            backgroundColor: 'black',
            ":hover": {
              backgroundColor: '#000000'
            }
          }} onClick={loginOrRegister}>{loginFormStatus.btnText}</Button>
        </Box>
      </main>
    </>
  )
}

export default Login