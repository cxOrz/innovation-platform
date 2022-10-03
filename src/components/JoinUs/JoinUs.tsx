import React, { useRef } from 'react'
import TextField from '@mui/material/TextField'
import styles from './JoinUs.module.css'
import Button from '@mui/material/Button'
import { useAppDispatch } from '../../hooks/redux'
import { updateSnackBar } from '../../stores/snackbar/snackbarSlice'
import useUserState from '../../hooks/useUserstate'
import axios from 'axios'
import { order_create } from '../../configs/api'

interface InputRefs {
  name: HTMLInputElement | null,
  studenID: HTMLInputElement | null,
  academy: HTMLInputElement | null,
  major: HTMLInputElement | null,
  gendor: HTMLInputElement | null,
  phone: HTMLInputElement | null,
  reason: HTMLInputElement | null
}

const JoinUs = () => {
  const [userState] = useUserState()
  const dispatch = useAppDispatch()
  const refs = useRef<InputRefs>({
    name: null,
    studenID: null,
    academy: null,
    major: null,
    gendor: null,
    phone: null,
    reason: null
  })

  async function handleSubmit() {
    axios.post(order_create, {
      message: `${refs.current.name?.value}，${refs.current.gendor?.value}，学号 ${refs.current.studenID?.value}，${refs.current.academy?.value}-${refs.current.major?.value}专业。想要申请加入组织，理由如下: ${refs.current.reason?.value}\n联系方式 ${refs.current.phone?.value}，期待得到您的反馈。`,
      title: '申请加入'
    }, {
      headers: { 'Authorization': userState?.token ? userState.token : "" }
    }).then(() => {
      dispatch(updateSnackBar({ severity: 'success', message: '已提交，请在工单支持页面查看', open: true }));
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <form className={styles.form}>
          <TextField id='name' inputRef={ref => refs.current.name = ref} label='姓名' className={styles._col_1_2} variant='filled' />
          <TextField id='student-id' inputRef={ref => refs.current.studenID = ref} label='学号' className={styles._col_3_4} variant='filled' />
          <TextField id='academy' inputRef={ref => refs.current.academy = ref} label='学院' variant='filled' />
          <TextField id='major' inputRef={ref => refs.current.major = ref} label='专业' variant='filled' />
          <TextField id='gendor' inputRef={ref => refs.current.gendor = ref} label='性别' variant='filled' />
          <TextField id='phone-num' inputRef={ref => refs.current.phone = ref} label='手机号码' variant='filled' />
          <TextField id='reason' inputRef={ref => refs.current.reason = ref} label='申请理由' className={styles._col_1_4} minRows='5' multiline variant='filled' />
        </form>
        <Button onClick={handleSubmit} sx={{ mt: 2, width: '6rem' }} variant='contained' disableElevation>提交</Button>
      </div>
    </div>
  )
}

export default JoinUs