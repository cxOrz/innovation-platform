import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos'
import IconButton from '@mui/material/IconButton'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Application } from '../../configs/apps'
import styles from './AppCard.module.css'

interface Props {
  data: Application
  click?: React.MouseEventHandler
  newTab?: boolean
}

const AppCard = ({ data, click, newTab }: Props) => {
  const navigate = useNavigate()
  return (
    <div className={styles.app_card} onClick={(e) => {
      click ? click(e) : (() => { })()
    }}>
      <div className={styles.avatar}>
        <img alt='app-icon' src={`/assets/app/logos/${data.picture}`} />
      </div>
      <div>
        <h3 className={styles.app_title}>{data.title}</h3>
        <p className={styles.app_note}>{data.note}</p>
      </div>
      <IconButton
        onClick={(e) => {
          if (newTab) {
            e.stopPropagation()
            window.open(data.url, '_blanked')
          } else {
            e.stopPropagation()
            navigate(data.url)
          }
        }}
        sx={{
          position: 'absolute',
          width: '2rem',
          height: '2rem',
          backgroundColor: '#f4f5fa',
          right: '1rem',
          top: '1.5rem'
        }}>
        <ArrowForwardIos sx={{ width: '1rem', color: '#cccccc', ":hover": { color: '#5e6678' } }} />
      </IconButton>
    </div>
  )
}

export default AppCard