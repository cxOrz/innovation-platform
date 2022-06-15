import React from 'react'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from './UserProfile.module.css'
import { Box, Button, TextField } from '@mui/material';
import { tcb_auth } from '../../configs/global';

interface Props { }

const UserProfile = (props: Props) => {
  const loginState = tcb_auth.hasLoginState() as any

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>我的资料</h1>
      <p className={styles.hero_paragraph}>你好，在这里可以对你的个人资料进行管理~</p>
      <div className={styles.content}>
        <h3>用户头像</h3>
        <div className={styles.avatar_section}>
          <img className={styles.avatar} width='128' height='128' src={'/assets/icons/avatar.webp'} />
          <Button sx={{ ml: '1rem' }} variant='outlined' disableElevation>上传图片</Button>
        </div>
        <p className={styles.hero_paragraph}>上传一张图片作为头像，推荐尺寸为 256x256 px</p>
        <Box className={styles.info_section} sx={{
          '& .MuiTextField-root': {
            my: 1
          }
        }}>
          <TextField size='small' label="手机号码" value={loginState.user.phone} disabled />
          <TextField size='small' label="昵称" value={loginState.user.nickName} />
        </Box>
        <Button variant='contained' disableElevation>更新资料</Button>
      </div>
    </div>
  )
}

export default UserProfile