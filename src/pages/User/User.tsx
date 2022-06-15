import React from 'react'
import Login from '../../components/Login/Login'
import UserCenter from '../../components/UserCenter/UserCenter'
import { tcb_auth } from '../../configs/global'
import styles from './User.module.css'

type Props = {}

const User = (props: Props) => {
  const loginState = tcb_auth.hasLoginState()
  console.log(loginState)
  return (
    <div className={styles.container}>
      {
        loginState ? <UserCenter /> : <Login />
      }
    </div>
  )
}

export default User