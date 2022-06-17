import React, { useEffect } from 'react'
import { AccountCircle } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NavLinks, { LinkProps } from '../NavLinks/NavLinks'
import styles from './NavigationBar.module.css'
import { useAppSelector } from '../../hooks/redux'
import { selectUser } from '../../stores/user/userSlice'

interface Props { }

const NavigationBar = (props: Props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const links: LinkProps[] = [
    { to: '/apps', label: '应用', isActive: location.pathname.match(/^\/apps/) ? true : false },
    { to: '/blog', label: '博客', isActive: location.pathname.match(/^\/blog/) ? true : false },
    { to: '/members', label: '成员概览', isActive: location.pathname === '/members' ? true : false }
  ]
  const user = useAppSelector(selectUser)

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_items}>
        <Link to='/' className={styles.navbar_title}>
          <div className={styles.navbar_logo}>
            <img alt='nav_logo' src='https://avatars.githubusercontent.com/u/69074203?s=64' />
          </div>
          <b>软件创新实践基地</b>
        </Link>
        <NavLinks linkProps={links} />
      </div>
      <div className={[styles.navbar_items, styles.navbar_items_right] as unknown as string}>
        <a target='_blank' rel='noreferrer' className={styles.exlink} href='https://github.com/cxOrz/innovation-platform'>
          GitHub&nbsp;
          <svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg>
        </a>
        <IconButton onClick={() => {
          navigate('user/profile')
        }}>
          {
            user.data!.avatarUrl === '' ?
              <AccountCircle /> : <img width='24' height='24' src={user.data?.avatarUrl} />
          }
        </IconButton>
      </div>
    </nav>
  )
}

export default NavigationBar