import { ArrowForwardIos } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'
import { Application } from '../../configs/apps'
import styles from './AppCard.module.css'

interface Props {
  data: Application
}

const AppCard = ({ data }: Props) => {
  return (
    <a className={styles.app_card}>
      <div className={styles.avatar}>
        <img src={require(`../../assets/app/logos/${data.picture}`)} />
      </div>
      <div>
        <h3 className={styles.app_title}>{data.title}</h3>
        <p className={styles.app_note}>{data.note}</p>
      </div>
      <IconButton sx={{
        position: 'absolute',
        width: '2rem',
        height: '2rem',
        backgroundColor: '#f4f5fa',
        right: '1rem',
        top: '1.5rem'
      }}>
        <ArrowForwardIos sx={{ width: '1rem', color: '#cccccc' }} />
      </IconButton>
    </a>
  )
}

export default AppCard