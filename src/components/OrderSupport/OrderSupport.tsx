import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './OrderSupport.module.css'
import { Order, OrderStatus } from '../../configs/types'
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
import axios from 'axios'
import { order_, order_sendmsg } from '../../configs/api'
import { useAppSelector } from '../../hooks/redux'
import { selectUser } from '../../stores/user/userSlice'

const OrderSupport = () => {
  const userState = useAppSelector(selectUser);
  const [open, setOpen] = useState(false)
  const textfield = useRef<HTMLInputElement>(null)
  const msgarea = useRef<HTMLInputElement>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [current, setCurrent] = useState(0)
  const computedChipColor = useCallback((color: OrderStatus) => {
    switch (color) {
      case '尚未受理': return 'error';
      case '受理中': return 'secondary';
      case '已解决': return 'success';
      case '已关闭': return 'default';
    }
  }, [])

  function getMyOrder() {
    axios.get(order_ + `?opened=true`, {
      headers: {
        'Authorization': userState.data?.token ? userState.data.token : ""
      }
    }).then((res) => {
      setOrders(res.data.data)
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
    axios.post(order_sendmsg, {
      id: orders[current]._id,
      message: textfield.current?.value
    }, { headers: { 'Authorization': userState.data?.token ? userState.data.token : "" } }).then(() => {
      const message = orders[current].message;
      const temp = orders;
      message.push({ data: textfield.current!.value, direction: 0 });
      temp.splice(current, 1, { ...orders[current], last_time: new Date(), message });
      setOrders([...temp]);
      textfield.current!.value = '';
    });
  }

  useEffect(() => {
    getMyOrder()
  }, [userState.data?.token])

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
                  padding: '0',
                  boxSizing: 'border-box',
                  '& .MuiListItemButton-root': {
                    padding: '0.75rem 1.5rem'
                  }
                }}>
                  <ListItemButton onClick={() => { switchOrder(i) }} selected={i === current}>
                    <ListItemText primary={
                      <>
                        <span className='primary-title'>#{order.count} {order.title}</span>
                        <Chip label={order.status} size='small' color={computedChipColor(order.status)} />
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
              <h1>#{orders[current].count} {orders[current].title}</h1>
              <p>ID: {orders[current]._id}</p>
              <span>分派对象：{orders[current].to_uid.slice(-4)}</span>
              <span>创建时间：{new Date(orders[current].open_date).toLocaleString()}</span>
              <span>最近消息：{new Date(orders[current].last_time).toLocaleString()}</span>
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