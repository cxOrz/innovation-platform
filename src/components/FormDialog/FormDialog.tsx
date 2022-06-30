import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styles from './FormDialog.module.css'
import { tcb_auth, tcb_db } from '../../configs/global';
import { getAdmin, getOrderCount } from '../JoinUs/JoinUs';
import useErrorMsg from '../../hooks/useErrorMsg';

interface Props {
  open: boolean
  handleClose: () => void,
  callback: () => void
}
interface InputRefs {
  title: HTMLInputElement | null
  reason: HTMLInputElement | null
}

export default function FormDialog({ open, handleClose, callback }: Props) {
  const [titleErr, dispatchTitleErr] = useErrorMsg(['', '请起一个合适的标题'])
  const [reasonErr, dispatchReasonErr] = useErrorMsg(['', '字数限制在5-250之间'])
  const refs = useRef<InputRefs>({
    title: null,
    reason: null
  })

  async function submit() {
    let flag = 0
    if (refs.current.title!.value.length < 4) {
      flag = 1
      dispatchTitleErr(1, true)
    } else {
      dispatchTitleErr(0, false)
    }
    if (refs.current.reason!.value.length < 5) {
      flag = 1
      dispatchReasonErr(1, true)
    } else {
      dispatchReasonErr(0, false)
    }
    if (flag === 0) {
      const date = new Date().getTime()
      tcb_db.collection('inno-orders').add({
        from_uid: tcb_auth.currentUser?.uid,
        last_date: date,
        message: [{ data: refs.current.reason?.value, direction: 0 }],
        open_date: date,
        status: '尚未受理',
        title: refs.current.title?.value,
        to_uid: await getAdmin(),
        id: await getOrderCount()
      }).then(() => {
        handleClose()
        callback()
      })
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>提交工单</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            inputRef={ref => refs.current.title = ref}
            error={titleErr.status}
            helperText={titleErr.msg}
            margin="dense"
            id="title"
            label="标题"
            type="text"
            variant="outlined"
            fullWidth
          />
          <TextField error={reasonErr.status}
            helperText={reasonErr.msg}
            inputRef={ref => refs.current.reason = ref}
            className={styles.textinput}
            fullWidth
            multiline
            rows='5'
            placeholder='在这里描述你遇到的问题' />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={submit}>确认提交</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
