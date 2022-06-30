import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { tcb_auth, tcb_db } from '../../configs/global';
import { Order, OrderStatus, Message } from '../../configs/types';
import styles from './OrderManage.module.css'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridRenderCellParams } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ChatMsgArea from '../../components/ChatMsgArea/ChatMsgArea';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';

const Toolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function OrderManage() {
  const user = tcb_auth.currentUser
  const [orders, setOrders] = useState<Order[]>([])
  const [order, setOrder] = useState<Order>()
  const [status, setStatus] = React.useState('')
  const textfield = useRef<HTMLInputElement>(null)
  const msgarea = useRef<HTMLInputElement>(null)
  const [dialogProps, setDialogProps] = useState({
    open: false,
    title: '',
    type: 'select',
    confirmLabel: '确认'
  })
  const computedColor = useCallback((color: OrderStatus) => {
    switch (color) {
      case '尚未受理': return 'error';
      case '受理中': return 'secondary';
      case '已解决': return 'success';
      case '已关闭': return 'default';
    }
  }, [])
  const columns: GridColDef[] = [
    { field: 'id', headerName: '编号', width: 70, sortable: false },
    {
      field: 'title',
      headerName: '标题',
      width: 250,
      sortable: false
    },
    {
      field: 'status',
      headerName: '状态',
      width: 100,
      sortable: true,
      renderCell: (params) => {
        return <Chip component='button' onClick={() => { handleChipClick(params) }} label={params.value} size="small" color={computedColor(params.value)} variant="filled" />
      }
    },
    {
      field: 'from_uid',
      headerName: '创建人',
      width: 150,
      sortable: false
    },
    {
      field: 'to_uid',
      headerName: '受理人',
      sortable: false,
      width: 150,
    },
    {
      field: 'open_date',
      headerName: '创建时间',
      width: 150,
      sortable: true,
      valueGetter: (params) => {
        return new Date(params.value).toLocaleString()
      }
    },
    {
      field: 'last_date',
      headerName: '更新时间',
      width: 150,
      sortable: true,
      valueGetter: (params) => {
        return new Date(params.value).toLocaleString()
      }
    },
    {
      field: 'operation',
      headerName: '操作',
      sortable: false,
      width: 200,
      renderCell: (params) => {
        return <>
          <Button sx={{ mr: 1 }} onClick={() => { handleReplyClick(params) }} variant="outlined" size='small'>答复</Button>
          <Button variant="outlined" size='small'>关闭</Button>
        </>
      }
    }
  ]

  function handleChipClick(val: GridRenderCellParams<string>) {
    setStatus(val.value as string)
    setOrder(val.row)
    setDialogProps({ title: '更改状态', type: 'select', confirmLabel: '确认更改', open: true })
  }

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string)
  }

  function handleClose() {
    setDialogProps((prev) => {
      return { ...prev, open: false }
    })
  }

  function handleConfirm() {
    if (dialogProps.type === 'select') {
      tcb_db.collection('inno-orders').doc(order?._id as string).update({
        status: status
      }).then((res) => {
        getMyOrder()
      })
    }
    setDialogProps((prev) => {
      return { ...prev, open: false }
    })
  }

  function handleReplyClick(params: GridRenderCellParams<React.ReactNode>) {
    setOrder(params.row)
    setDialogProps({ title: '答复用户', type: 'reply', confirmLabel: '完成', open: true })
  }


  function sendMessage() {
    tcb_db.collection('inno-orders').doc(order?._id as string).update({
      last_date: new Date().getTime(),
      message: tcb_db.command.push({ data: textfield.current?.value, direction: 1 })
    }).then(() => {
      const message = order?.message as Message[]
      message.push({ data: textfield.current!.value, direction: 1 })
      setOrder((prev) => {
        return ({ ...prev, message: message }) as Order
      })
      textfield.current!.value = ''
      getMyOrder()
    })
  }

  function getMyOrder() {
    tcb_db.collection('inno-orders').where({
      from_uid: user?.uid
    }).orderBy('open_date', 'desc').get().then((res) => {
      setOrders(res.data)
    })
  }

  useEffect(() => {
    getMyOrder()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      msgarea.current?.scroll({ top: msgarea.current.scrollHeight })
    }, 0);
  }, [order, dialogProps.open])

  return (
    <div className={styles.container}>
      <Box flex='1' sx={{ height: '100%' }}>
        <DataGrid
          rows={orders}
          columns={columns}
          components={{ Toolbar: Toolbar }}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
        />
      </Box>
      <Dialog open={dialogProps.open} onClose={handleClose}>
        <DialogTitle>{dialogProps.title}</DialogTitle>
        <DialogContent>
          {
            dialogProps.type === 'select' ?
              <FormControl fullWidth sx={{ mt: 1, minWidth: 180 }}>
                <InputLabel id="select-label">状态</InputLabel>
                <Select
                  labelId="select-label"
                  value={status}
                  label="状态"
                  onChange={handleStatusChange}
                >
                  <MenuItem value="尚未受理">尚未受理</MenuItem>
                  <MenuItem value="受理中">受理中</MenuItem>
                  <MenuItem value="已解决">已解决</MenuItem>
                </Select>
              </FormControl>
              :
              <div className={styles.reply}>
                <div ref={msgarea} className={styles.msgArea}>
                  <ChatMsgArea chat={order!.message} direction={1} />
                </div>
                <div className={styles.textarea}>
                  <TextField inputRef={textfield} className={styles.textinput} sx={{ width: '100%', mr: 1 }} multiline maxRows='2' placeholder='在这里输入消息' />
                  <button onClick={sendMessage}>
                    <SendIcon />
                  </button>
                </div>
              </div>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleConfirm}>{dialogProps.confirmLabel}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}