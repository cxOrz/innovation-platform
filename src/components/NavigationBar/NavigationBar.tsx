import React, { useEffect, useState } from 'react'
import { AccountCircle } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NavLinks, { LinkProps } from '../NavLinks/NavLinks'
import styles from './NavigationBar.module.css'

interface Props { }

const NavigationBar = (props: Props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const links: LinkProps[] = [
    { to: '/apps', label: '应用', isActive: location.pathname === '/apps' ? true : false },
    { to: '/members', label: '成员概览', isActive: location.pathname === '/members' ? true : false }
  ]

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_items}>
        <Link to='/' className={styles.navbar_title}>
          <div className={styles.navbar_logo}>
            <img src='logo192.png' />
          </div>
          <b>软件创新实践基地</b>
        </Link>
        <NavLinks linkProps={links} />
      </div>
      <div className={[styles.navbar_items, styles.navbar_items_right] as unknown as string}>
        <IconButton onClick={() => {
          navigate('user')
        }}>
          <AccountCircle />
        </IconButton>
      </div>
    </nav>
  )
}

export default NavigationBar