import { Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Feature from '../../components/Feature/Feature'
import styles from './Home.module.css'

type Props = {}

const Home = (props: Props) => {
  const navigate = useNavigate()
  return (
    <div>
      <header className={styles.head_section}>
        <img src='https://avatars.githubusercontent.com/u/69074203?s=256' />
        <h1 className={styles.home_title}>软件创新与实践综合基地</h1>
        <p className={styles.home_paragraph}>外面变幻无常、里面百废待兴</p>
        <Button onClick={() => { navigate('apps') }} variant='contained' size='large' disableElevation>跟我走吧</Button>
      </header>
      <main className={styles.primary_section}>
        <Feature title='💡' desc='使用门户中集成的各种应用，其中大部分由我们自己开发' />
        <Feature title='🏫' desc='我们生活在不同校区，但是连接着同一个网络' />
        <Feature title='🔍' desc='与百度和 Google 合作，有问题直接进行搜索' />
      </main>
    </div>
  )
}

export default Home