import { Box, Button, InputLabel, TextField } from '@mui/material'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import React, { useRef, useState } from 'react'
import styles from './Login.module.css'
import { tcb_auth } from '../../configs/global';

interface Props { }

interface InputRefs {
  phone: HTMLInputElement | null,
  verifyCode: HTMLInputElement | null,
  password: HTMLInputElement | null
}

const Login = (props: Props) => {
  const [loginFormStatus, setLoginFormStatus] = useState({
    loginType: 0,
    labelText: '密码',
    btnText: '注册或登录'
  })
  const [inputError, setInputError] = useState({
    phone: false,
    verifyCode: false,
    password: false
  })
  const [countDown, setCountDown] = useState<string | number>('发送')
  const refs = useRef<InputRefs>({
    phone: null,
    verifyCode: null,
    password: null
  })
  let interval: NodeJS.Timer

  function SendVerifyCode() {
    if (refs.current.phone!.value.match(/^[0-9]{11}$/g)) {
      tcb_auth.sendPhoneCode(refs.current.phone!.value)
        .then((res) => {
          console.log(`验证码发送：${res}`)
        })
      setCountDown(60)
      setInputError((prev) => {
        return { ...prev, phone: false }
      })
      interval = setInterval(() => {
        setCountDown(prev => {
          if (prev === 0) {
            clearInterval(interval)
            return '发送'
          }
          return (prev as number - 1)
        })
      }, 1000)
    } else {
      setInputError((prev) => {
        return { ...prev, phone: true }
      })
    }
  }

  function login() {
    let flag = 0
    if (!refs.current.phone!.value.match(/^[0-9]{11}$/g)) {
      setInputError((prev) => { return { ...prev, phone: true } })
      flag = 1
    }
    if (!refs.current.verifyCode!.value.match(/^[0-9]{6}$/g)) {
      setInputError((prev) => { return { ...prev, verifyCode: true } })
      flag = 1
    }
    if (flag === 0) {
      tcb_auth.signInWithPhoneCodeOrPassword({
        phoneNumber: refs.current.phone!.value,
        phoneCode: refs.current.verifyCode!.value
      }).then((loginState) => {
        console.log(loginState)
        window.location.reload()
      }).catch(() => {
        setInputError((prev) => ({ ...prev, verifyCode: true }))
      })
    }
  }

  return (
    <>
      <header className={styles.head_section}>
        <h1 className={styles.hero_title}>登录你的账户</h1>
        <p className={styles.hero_paragraph}>
          登录以获得完整的门户使用体验，你可以注册并提交自己的应用，也可以申请成为我们的一员。如果没有账户，在登陆时将自动为你注册。
        </p>
      </header>
      <main className={styles.main_content}>
        <Box className={styles.card} sx={{
          '& .MuiTextField-root': { m: 1 }
        }}>
          <TextField inputRef={ref => { refs.current.phone = ref }} id="phone-num" error={inputError.phone}
            helperText={inputError.phone ? '请输入正确的手机号' : ' '} label="手机号码" variant="outlined" />
          {
            loginFormStatus.loginType === 0 ?
              <>
                <FormControl error={inputError.verifyCode} sx={{ m: 1 }} variant="outlined">
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
              </>
              :
              <TextField inputRef={ref => { refs.current.password = ref }} id="password" error={inputError.password}
                helperText={inputError.password ? '请重新输入密码' : ' '} label="密码" variant="outlined" />
          }
          <hr className={styles.hr} />
          <span style={{ margin: '0.5rem 0' }} className={styles.clickable_text}
            onClick={() => {
              if (loginFormStatus.loginType === 0)
                setLoginFormStatus({ loginType: 1, labelText: '验证码', btnText: '登录' })
              else
                setLoginFormStatus({ loginType: 0, labelText: '密码', btnText: '注册或登录' })
            }}>使用{loginFormStatus.labelText}登录</span>
          <Button variant='contained' disableElevation sx={{
            m: '0.5rem',
            backgroundColor: 'black',
            ":hover": {
              backgroundColor: '#000000'
            }
          }} onClick={login}>{loginFormStatus.btnText}</Button>
        </Box>
      </main>
    </>
  )
}

export default Login