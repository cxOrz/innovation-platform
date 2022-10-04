import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Order, OrderStatus, Message } from '../../configs/types';
import styles from './OrderManage.module.css'
import Box from '@mui/material/Box';
import { DataGrid, zhCN, GridColDef, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridRenderCellParams } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ChatMsgArea from '../../components/ChatMsgArea/ChatMsgArea';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { order_, order_sendmsg, order_update } from '../../configs/api';
import { useAppSelector } from '../../hooks/redux';
import { selectUser } from '../../stores/user/userSlice';

interface ToolBarProps {
  getOrders: (range?: 'all' | 'my') => void
}

const Toolbar = (props: ToolBarProps) => {
  const [torch, setTorch] = useState(false)

  // 更新或渲染后读取工单获取范围，并设置；若无范围，则写入“my”作为范围；
  useEffect(() => {
    const range = localStorage.getItem('getOrdersRange')
    setTorch(true)
    if (range === 'all') {
      setTorch(true)
    } else if (range === 'my') {
      setTorch(false)
    } else {
      localStorage.setItem('getOrdersRange', 'my')
    }
  }, [])

  /**
   * 
   * 切换时，将当前值写入localstorage
   */
  function handleSwitchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTorch(e.currentTarget.checked)
    if (e.currentTarget.checked) {
      props.getOrders('all')
      localStorage.setItem('getOrdersRange', 'all')
    } else {
      props.getOrders('my')
      localStorage.setItem('getOrdersRange', 'my')
    }
  }

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport csvOptions={{
        utf8WithBom: true
      }} />
      <FormControlLabel control={<Switch checked={torch} onChange={handleSwitchChange} />} label="全部工单" />
    </GridToolbarContainer>
  );
}

export default function OrderManage() {
  const userState = useAppSelector(selectUser).data;
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [order, setOrder] = useState<Order>();
  const [status, setStatus] = React.useState('');
  const textfield = useRef<HTMLInputElement>(null);
  const msgarea = useRef<HTMLInputElement>(null);
  const [dialogProps, setDialogProps] = useState({
    open: false,
    title: '',
    type: 'select',
    confirmLabel: '确认'
  });
  const computedColor = useCallback((color: OrderStatus) => {
    switch (color) {
      case '尚未受理': return 'error';
      case '受理中': return 'secondary';
      case '已解决': return 'success';
      case '已关闭': return 'default';
    }
  }, []);
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
      field: 'openid',
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
      field: 'last_time',
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
          <Button onClick={() => { handleOrderOnOff(params) }} variant="outlined" size='small'>{params.row.status === '已关闭' ? '开启' : '关闭'}</Button>
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
      axios.post(order_update, {
        id: order?._id,
        status: status
      }, { headers: { 'Authorization': userState?.token ? userState?.token : "" } }).then(() => {
        fetchOrders();
      });
    }
    setDialogProps((prev) => {
      return { ...prev, open: false }
    })
  }

  function handleReplyClick(params: GridRenderCellParams<React.ReactNode>) {
    setOrder(params.row)
    setDialogProps({ title: '答复用户', type: 'reply', confirmLabel: '完成', open: true })
  }

  function handleOrderOnOff(params: GridRenderCellParams<React.ReactNode>) {
    axios.post(order_update, {
      id: params.row._id,
      status: params.row.status === '已关闭' ? '受理中' : '已关闭'
    }, { headers: { 'Authorization': userState?.token ? userState?.token : "" } }).then(() => {
      fetchOrders();
    });
  }

  /**
   * 发送完成后，更新工单
   */
  function sendMessage() {
    axios.post(order_sendmsg, {
      id: order?._id,
      message: textfield.current?.value
    }, { headers: { 'Authorization': userState?.token ? userState?.token : "" } }).then(() => {
      const message = order?.message as Message[];
      message.push({ data: textfield.current!.value, direction: 1 });
      setOrder((prev) => {
        return ({ ...prev, message: message }) as Order;
      })
      textfield.current!.value = '';
      fetchOrders();
    });
  }

  /**
   * 
   * @param range 传入，则通过该参数判断获取范围；不传入，则通过localstorage储存的属性来判断获取范围
   */
  function fetchOrders(range?: 'all' | 'my') {
    setLoading(true);
    let query = '';
    if (range === undefined) {
      range = localStorage.getItem('getOrdersRange') as ('all' | 'my')
    }
    if (range === 'my') query = '?to_uid=' + userState?.uid;
    axios.get(order_ + query, { headers: { 'Authorization': userState?.token ? userState?.token : "" } }).then((res) => {
      setOrders([...res.data.data]);
      setLoading(false);
    });
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  // 当前工单消息变化时、聊天对话框状态变更时，滚动聊天消息至底部
  useEffect(() => {
    setTimeout(() => {
      msgarea.current?.scroll({ top: msgarea.current.scrollHeight })
    }, 0);
  }, [order, dialogProps.open])

  return (
    <div className={styles.container}>
      <Box flex='1' sx={{ height: '100%' }}>
        <DataGrid
          getRowId={(row) => row._id}
          loading={loading}
          rows={orders}
          columns={columns}
          components={{ Toolbar: Toolbar, LoadingOverlay: LinearProgress }}
          componentsProps={{
            toolbar: {
              getOrders: fetchOrders
            }
          }}
          pageSize={10}
          rowsPerPageOptions={[10]}
          localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
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