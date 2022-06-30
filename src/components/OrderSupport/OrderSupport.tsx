import React, { useEffect, useRef, useState } from 'react'
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
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import ChatMsgArea from '../ChatMsgArea/ChatMsgArea'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import FormDialog from '../FormDialog/FormDialog'

const OrderSupport = () => {
  const user = tcb_auth.currentUser
  const [open, setOpen] = useState(false)
  const textfield = useRef<HTMLInputElement>(null)
  const msgarea = useRef<HTMLInputElement>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [current, setCurrent] = useState(0)

  function getMyOrder() {
    tcb_db.collection('inno-orders').where({
      from_uid: user?.uid
    }).orderBy('open_date', 'desc').get().then((res) => {
      console.log(res.data)
      setOrders(res.data)
    })
  }

  function switchOrder(index: number) {
    setCurrent(index)
  }

  function openAddDialog() {
    setOpen(true)
  }
  function closeAddDialog() {
    setOpen(false)
  }

  function sendMessage() {
    tcb_db.collection('inno-orders').doc(orders[current]._id).update({
      last_date: new Date().getTime(),
      message: tcb_db.command.push({ data: textfield.current?.value, direction: 0 })
    }).then(() => {
      const message = orders[current].message
      const temp = orders
      message.push({ data: textfield.current!.value, direction: 0 })
      temp.splice(current, 1, { ...orders[current], last_date: new Date().getTime(), message })
      setOrders([...temp])
      textfield.current!.value = ''
    })
  }

  useEffect(() => {
    getMyOrder()
  }, [])

  useEffect(() => {
    msgarea.current?.scroll({ top: msgarea.current.scrollHeight })
  }, [orders[current]?.message.length])

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
          <Button onClick={openAddDialog} variant='outlined' disableElevation sx={{ width: '100%', my: '2px' }}><AddIcon /></Button>
          {
            orders.map((order, i) => {
              const date = new Date(order.open_date)
              return (
                <ListItem key={i} sx={{
                  boxSizing: 'border-box', padding: '0',
                  '& .MuiListItemButton-root': {
                    padding: '0.75rem 1.5rem'
                  }
                }}>
                  <ListItemButton onClick={() => { switchOrder(i) }} selected={i === current}>
                    <ListItemText primary={
                      <>
                        <span className='primary-title'>#{order.id} {order.title}</span>
                        <Chip label="已发起" size='small' color="primary" />
                      </>
                    } secondary={
                      <>
                        <span style={{ display: 'block', margin: '0.5rem 0 0' }}>日期：{date.toLocaleString()} </span>
                        <span style={{ wordBreak: 'break-all' }}>序号：{order._id}</span>
                      </>
                    } />
                  </ListItemButton>
                </ListItem>
              )
            })
          }
        </List>
      </div>
      <div className={styles.orderSide}>
        {
          orders[current] &&
          <>
            <div className={styles.head}>
              <h1>#{orders[current].id} {orders[current].title}</h1>
              <p>ID: {orders[current]._id}</p>
              <span>分派对象：{orders[current].to_uid.slice(-4)}</span>
              <span>创建时间：{new Date(orders[current].open_date).toLocaleString()}</span>
              <span>最近消息：{new Date(orders[current].last_date).toLocaleString()}</span>
            </div>
            <div ref={msgarea} className={styles.msgArea}>
              <ChatMsgArea direction={0} chat={orders[current].message} />
            </div>
            <div className={styles.textarea}>
              <TextField inputRef={textfield} className={styles.textinput} sx={{ width: '100%', mr: 1 }} multiline maxRows='2' placeholder='在这里输入消息' />
              <button onClick={sendMessage}>
                <SendIcon />
              </button>
            </div>
          </>
        }
      </div>
      <FormDialog open={open} handleClose={closeAddDialog} callback={getMyOrder} />
    </div >
  )
}

export default OrderSupport