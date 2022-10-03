import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styles from './FormDialog.module.css'
import useErrorMsg from '../../hooks/useErrorMsg';
import useUserState from '../../hooks/useUserstate';
import axios from 'axios';
import { order_create } from '../../configs/api';

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
  const [userState] = useUserState()
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
      axios.post(order_create, {
        title: refs.current.title?.value,
        message: refs.current.reason?.value
      }, {
        headers: {
          'Authorization': userState?.token ? userState.token : ""
        }
      }).then(() => {
        handleClose()
        callback()
      });
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
