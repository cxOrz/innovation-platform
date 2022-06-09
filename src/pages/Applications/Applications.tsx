import React from 'react'
import AppCard from '../../components/AppCard/AppCard'
import { apps } from '../../configs/apps'
import styles from './Applications.module.css'

type Props = {}

const Applications = (props: Props) => {
  return (
    <div className={styles.container}>
      {
        apps.map((app, i) => {
          return <AppCard key={i} data={app} />
        })
      }
    </div>
  )
}

export default Applications