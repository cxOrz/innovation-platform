import { Box, Button, InputLabel, TextField } from '@mui/material'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import React, { useRef, useState } from 'react'
import styles from './Login.module.css'

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

  return (
    <Box className={styles.card} sx={{
      '& .MuiTextField-root': { m: 1 }
    }}>
      <TextField inputRef={ref => { refs.current.phone = ref }} id="phone-num" error={inputError.phone}
        helperText={inputError.phone ? '请输入正确的手机号' : ' '} label="手机号码" variant="outlined" />
      {
        loginFormStatus.loginType === 0 ?
          <>
            <FormControl sx={{ m: 1 }} variant="outlined">
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
              <FormHelperText> </FormHelperText>
            </FormControl>
          </>
          :
          <>
            <FormControl sx={{ m: 1 }} error={inputError.password} variant="outlined">
              <InputLabel htmlFor="password">密码</InputLabel>
              <OutlinedInput
                id="password"
                inputRef={ref => refs.current.password = ref}
                type='password'
                label='密码' />
              <FormHelperText>{inputError.password ? '请重新输入密码' : ' '}</FormHelperText>
            </FormControl>
          </>
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
      }} onClick={() => {

      }}>{loginFormStatus.btnText}</Button>
    </Box>
  )
}

export default Login