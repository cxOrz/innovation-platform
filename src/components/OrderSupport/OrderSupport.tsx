import React, { useEffect, useState } from 'react'
import styles from './OrderSupport.module.css'
import { tcb_app, tcb_auth, tcb_db } from '../../configs/global'
import { Order } from '../../configs/types'
import { useAppSelector } from '../../hooks/redux'
import { selectUser } from '../../stores/user/userSlice'

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
      <div className={styles.listSide}></div>
      <div className={styles.orderSide}></div>
    </div>
  )
}

export default OrderSupport