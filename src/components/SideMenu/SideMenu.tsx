import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useNavigate } from 'react-router-dom';
import { tcb_auth } from '../../configs/global';

const SideMenu = () => {
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const navigate = useNavigate()

  const handleListItemClick = (index: number, path: string) => {
    setSelectedIndex(index)
    navigate(path)
  }

  const logout = () => {
    tcb_auth.signOut().then(() => {
      window.location.reload()
    })
  }

  useEffect(() => {
    switch (window.location.pathname) {
      case '/user/profile': setSelectedIndex(0); break;
      case '/user/support': setSelectedIndex(1); break;
      case '/user/join-us': setSelectedIndex(2); break;
    }
  }, [])

  return (
    <List sx={{
      width: '100%', boxSizing: 'border-box', maxWidth: 250, bgcolor: 'background.paper', border: '1px solid #e6e7ea',
      '& .MuiListItemText-primary': {
        fontSize: '1rem'
      },
      '& .MuiListItemIcon-root': {
        minWidth: '42px'
      }
    }}>
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={() => handleListItemClick(0, 'profile')}>
        <ListItemIcon>
          <AssignmentIndIcon />
        </ListItemIcon>
        <ListItemText primary="我的资料" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={() => handleListItemClick(1, 'support')}>
        <ListItemIcon>
          <MailOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="工单支持" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 2}
        onClick={() => handleListItemClick(2, 'join-us')}>
        <ListItemIcon>
          <GroupsIcon />
        </ListItemIcon>
        <ListItemText primary="加入我们" />
      </ListItemButton>
      <ListItemButton
        onClick={logout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="退出登录" />
      </ListItemButton>
    </List >
  )
}

export default SideMenu