import React from 'react'
import Login from '../../components/Login/Login'
import UserCenter from '../../components/UserCenter/UserCenter'
import useUserState from '../../hooks/useUserstate'
import styles from './User.module.css'

type Props = {}

const User = (props: Props) => {
  const [loginState] = useUserState()
  return (
    <div className={styles.container}>
      {
        loginState ? <UserCenter /> : <Login />
      }
    </div>
  )
}

export default User