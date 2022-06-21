import { Button } from '@mui/material'
import TextField from '@mui/material/TextField'
import React from 'react'
import styles from './BlogToolBar.module.css'

interface Props { }

const BlogToolBar = (props: Props) => {

  return (
    <div className={styles.toolbar}>
      <TextField sx={{ flex: '5 1 0' }} label="标题" size='small' variant="filled" />
      <TextField sx={{ flex: '4 1 0' }} label="标签(空格分开)" size='small' variant="filled" />
      <TextField sx={{ flex: '3 1 0' }} label="Github用户名" size='small' variant="filled" />
      <TextField sx={{ flex: '3 1 0' }} label="一条签名(可空)" size='small' variant="filled" />
      <Button variant='contained' disableElevation>发布文章</Button>
    </div>
  )
}

export default BlogToolBar