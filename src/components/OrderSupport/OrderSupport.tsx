import React, { useEffect, useState } from 'react'
import styles from './OrderSupport.module.css'
import { tcb_app, tcb_auth, tcb_db } from '../../configs/global'
import { Order } from '../../configs/types'
import { useAppSelector } from '../../hooks/redux'
import { selectUser } from '../../stores/user/userSlice'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import List from '@mui/material/List'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import ChatMsgArea from '../ChatMsgArea/ChatMsgArea'

interface Props { }

const OrderSupport = (props: Props) => {
  const user = tcb_auth.currentUser
  const myOrders = useState<Order[]>([])

  function getMyOrder() {
    tcb_db.collection('inno-orders').where({
      from_uid: user?.uid
    }).get().then((res) => {
      console.log(res.data)
    })
  }

  useEffect(() => {
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.listSide}>
        <List sx={{
          width: '100%', minWidth: 250, padding: 0,
          '& .primary-title': {
            fontSize: '1.125rem',
            fontWeight: 700,
            color: '#393e46',
            verticalAlign: 'middle'
          }
        }}>
          <ListItem sx={{
            boxSizing: 'border-box', padding: '0',
            '& .MuiListItemButton-root': {
              padding: '0.75rem 1.5rem'
            }
          }}>
            <ListItemButton selected>
              <ListItemText primary={
                <>
                  <span className='primary-title'>#24 申请加入</span>
                  <Chip label="已发起" sx={{}} size='small' color="primary" />
                </>
              } secondary={
                <>
                  <span style={{ display: 'block', margin: '0.5rem 0 0' }}>日期：2022-06-25 </span>
                  <span style={{ wordBreak: 'break-all' }}>ID：f6e08a6462b5c766096fd2323bf1531c</span>
                </>
              } />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
      <div className={styles.orderSide}>
        <div className={styles.head}>
          <h1>#24 申请加入组织</h1>
          <p>ID: f6e08a6462b5c766096fd2323bf1531c</p>
          <span>创建时间：2022-06-25</span>
          <span>最近消息：2022-06-26</span>
          <span>分派对象：Gezi</span>
        </div>
        <div className={styles.msgArea}>
          <ChatMsgArea chat={['你好啊Gezi！', '您好！请问有什么可以帮到你的？', '帮我冲1000个Q币吧。']} />
        </div>
      </div>
    </div >
  )
}

export default OrderSupport