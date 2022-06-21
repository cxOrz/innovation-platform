import React from 'react'
import { useNavigate } from 'react-router-dom'
import AppCard from '../../components/AppCard/AppCard'
import { apps } from '../../configs/apps'
import { TargetName } from '../../configs/global'
import styles from './Applications.module.css'

type Props = {}

const Applications = (props: Props) => {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h3 className={styles.category_name}># 基地应用</h3>
        <div className={styles.category}>
          <AppCard click={() => { navigate('/apps/apply-app') }} data={{
            title: '应用提交',
            note: '将你开发的应用提交至此',
            description: '你可以提交你开发的应用，审核过后会添加到应用页面，供大家使用。',
            picture: 'apply-my-app.webp',
            url: `https://github.com/${TargetName}/innovation-platform/edit/main/src/configs/apps.ts`,
            category: 'base'
          }} />
          {
            apps.base.map((app, i) => {
              return <AppCard key={i} click={() => { navigate('/apps/base/' + i) }} data={app} />
            })
          }
        </div>
      </section >
      <section className={styles.section}>
        <h3 className={styles.category_name}># 前端开发</h3>
        <div className={styles.category}>
          {
            apps.frontend.map((app, i) => {
              return <AppCard key={i} click={() => { navigate('/apps/frontend/' + i) }} data={app} />
            })
          }
        </div>
      </section>
      <section className={styles.section}>
        <h3 className={styles.category_name}># 推荐学习</h3>
        <div className={styles.category}>
          {
            apps.learn.map((app, i) => {
              return <AppCard key={i} click={() => { navigate('/apps/learn/' + i) }} data={app} />
            })
          }
        </div>
      </section>
      <section className={styles.section}>
        <h3 className={styles.category_name}># 实用工具</h3>
        <div className={styles.category}>
          {
            apps.tools.map((app, i) => {
              return <AppCard key={i} click={() => { navigate('/apps/tools/' + i) }} data={app} />
            })
          }
        </div>
      </section>
    </div >
  )
}

export default Applications