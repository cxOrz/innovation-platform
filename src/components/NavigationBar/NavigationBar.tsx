import React, { useState } from 'react'
import AccountCircle from '@mui/icons-material/AccountCircle'
import GitHub from '@mui/icons-material/GitHub'
import IconButton from '@mui/material/IconButton'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NavLinks, { LinkProps } from '../NavLinks/NavLinks'
import styles from './NavigationBar.module.css'
import { useAppSelector } from '../../hooks/redux'
import { selectUser } from '../../stores/user/userSlice'
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box'
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'

interface Props { }

const NavigationBar = (props: Props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const links: LinkProps[] = [
    { to: '/apps', label: '应用', isActive: location.pathname.match(/^\/apps/) ? true : false },
    { to: '/blog/page/1', label: '博客', isActive: location.pathname.match(/^\/blog/) ? true : false },
    { to: '/members', label: '成员概览', isActive: location.pathname === '/members' ? true : false }
  ]
  const user = useAppSelector(selectUser)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setDrawerOpen(open)
    }

  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Toolbar>
        <h3
          onClick={() => { setTimeout(() => { navigate('/'); }, 0) }}
          className={styles.navbar_title}>
          <div className={styles.navbar_logo}>
            <img alt='nav_logo' src='https://avatars.githubusercontent.com/u/69074203?s=64' />
          </div>
          <b>软件创新实践基地</b>
        </h3>
      </Toolbar>
      <Divider />
      <List>
        {[['应用', '/apps'], ['博客', '/blog/page/1'], ['成员概览', '/members']].map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => {
              setDrawerOpen(false)
              setTimeout(() => {
                navigate(text[1])
              }, 0)
            }}>
              <ListItemText primary={text[0]} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton href='https://github.com/cxOrz/innovation-platform' target='_blank' rel='noreferrer'>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <GitHub />
            </ListItemIcon>
            <ListItemText primary='Github' />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
  return (
    <Box>
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
        <div className={styles.navbar_items_right}>
          <a target='_blank' rel='noreferrer' className={styles.exlink} href='https://github.com/cxOrz/innovation-platform'>
            GitHub&nbsp;
            <svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg>
          </a>
          <IconButton onClick={() => {
            navigate('user/profile')
          }}>
            {
              user.data!.avatarUrl === '' ?
                <AccountCircle /> : <img width='24' height='24' style={{ borderRadius: '50%' }} src={user.data?.avatarUrl} />
            }
          </IconButton>
        </div>
      </nav>

      <AppBar className={styles.AppBar} color='transparent' sx={{
        maxHeight: 60,
        bgcolor: '#f9fafc',
        boxShadow: '0px 1px 2px #e9e9e9'
      }}
        position="fixed"
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <h3 className={styles.main_title} style={{ flex: '1' }}>
            软件创新与实践综合基地
          </h3>
          <div className={styles.navbar_items_right}>
            <IconButton onClick={() => {
              navigate('user/profile')
            }}>
              {
                user.data!.avatarUrl === '' ?
                  <AccountCircle /> : <img width='24' height='24' style={{ borderRadius: '50%' }} src={user.data?.avatarUrl} />
              }
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor='left'
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        keepMounted
      >
        {list}
      </Drawer>
    </Box>
  )
}

export default NavigationBar