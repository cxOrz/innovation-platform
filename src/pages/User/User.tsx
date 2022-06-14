import React from 'react'
import Login from '../../components/Login/Login'
import styles from './User.module.css'

type Props = {}

const User = (props: Props) => {
  return (
    <div className={styles.container}>
      <header className={styles.head_section}>
        <h1 className={styles.hero_title}>登录你的账户</h1>
        <p className={styles.hero_paragraph}>
          登录以获得完整的门户使用体验，你可以注册并提交自己的应用，也可以申请成为我们的一员。如果没有账户，在登陆时将自动为你注册。
        </p>
      </header>
      <main className={styles.main_content}>
        <Login />
      </main>
    </div>
  )
}

export default User