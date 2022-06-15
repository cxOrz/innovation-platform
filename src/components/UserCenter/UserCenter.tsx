import React from 'react'
import { Outlet } from 'react-router-dom'
import SideMenu from '../SideMenu/SideMenu'
import styles from './UserCenter.module.css'

interface Props { }

const UserCenter = (props: Props) => {
  return (
    <div className={styles.container}>
      <SideMenu />
      <div className={styles.render}>
        <Outlet />
      </div>
    </div>
  )
}

export default UserCenter