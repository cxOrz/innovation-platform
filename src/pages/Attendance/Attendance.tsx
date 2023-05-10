import LockIcon from '@mui/icons-material/Lock';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { attendance_ } from '../../configs/api';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectUser } from '../../stores/user/userSlice';
import GridItem from './GridItem/GridItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import { updateSnackBar } from '../../stores/snackbar/snackbarSlice';

interface ItemType {
  _id: string;
  realname: string;
  total: number;
  today: number;
  on: boolean;
}

const Attendance = () => {
  const userState = useAppSelector(selectUser).data;
  const dispatch = useAppDispatch();
  const [data, setData] = useState<ItemType[]>([]);
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'on' | 'off'>('off');

  const fetchData = () => {
    axios.get(attendance_, {
      headers: { 'Authorization': userState.token }
    }).then(res => {
      setData(res.data.data);
      setMode(res.data.mode);
    });
  };

  // On & Off
  const handleClick = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = ev.target as HTMLElement;
    const box: HTMLElement | null = target.closest('div[data-on]');
    if (box && mode === 'on') {
      const state = box.dataset.on === 'true' ? 'off' : 'on';
      axios.put(`${attendance_}/toggle`, { _id: box.dataset.id, state }, {
        headers: { 'Authorization': userState.token }
      }).then(res => {
        if (res.data.code === 200) {
          const msg = box.dataset.on === 'true' ? '计时结束' : '开始计时';
          dispatch(updateSnackBar({ open: true, message: msg, severity: 'success' }));
          setData(prev => prev.map(item => {
            if (item._id === box.dataset.id) {
              return ({ ...item, on: state === 'off' ? false : true });
            }
            else return item;
          }));
        } else {
          dispatch(updateSnackBar({ open: true, message: res.data.data, severity: 'error' }));
        }
      });
    }
  };

  // 生成动态码
  const generateCode = () => {
    setOpen(true);
    axios.get(`${attendance_}/code`, {
      headers: { 'Authorization': userState.token }
    }).then(res => {
      setCode(res.data.data);
    });
  };

  // 渲染动态码内容
  const renderCode = useMemo(() => {
    const arr = code.split('');

    return (
      <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '8vh' }}>
        {
          arr.map((c, index) => {
            return <span key={index}>{c}</span>;
          })
        }
      </div>
    );
  }, [code]);

  // 渲染动态码输入表单
  const renderCodeInput = useMemo(() => {
    if (input.length === 6) {
      axios.put(`${attendance_}/mode/on`, { code: input }, {
        headers: { 'Authorization': userState.token }
      }).then(res => {
        if (res.data.code === 200) {
          setMode('on');
          setOpen(false);
          dispatch(updateSnackBar({ open: true, message: '已切换到考勤模式', severity: 'success' }));
        } else {
          setInput('');
          dispatch(updateSnackBar({ open: true, message: res.data.data, severity: 'error' }));
        }
      });
    }
    return (
      <div>
        <TextField
          autoFocus
          fullWidth
          disabled={input.length === 6}
          margin="dense"
          type='text'
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </div>
    );
  }, [input]);

  // 切换模式
  const onSwitchMode = () => {
    if (mode === 'on') {
      // 关闭读写模式，直接关
      axios.put(`${attendance_}/mode/off`, {}, {
        headers: { 'Authorization': userState.token }
      }).then(res => {
        if (res.data.code === 200) {
          setMode('off');
          dispatch(updateSnackBar({ open: true, message: '已切换到只读模式', severity: 'success' }));
        } else {
          dispatch(updateSnackBar({ open: true, message: res.data.data, severity: 'error' }));
        }
      });
    } else {
      // 开启读写模式
      if (userState.role <= 1) {
        // 直接开
        axios.put(`${attendance_}/mode/on`, {}, {
          headers: { 'Authorization': userState.token }
        }).then(res => {
          if (res.data.code === 200) {
            setMode('on');
            dispatch(updateSnackBar({ open: true, message: '已切换到考勤模式', severity: 'success' }));
          }
        });
      } else {
        // 用动态码来开
        setOpen(true);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setCode('');
    setInput('');
  };

  useEffect(() => {
    fetchData();
    const timer = setInterval(() => {
      fetchData();
    }, 180000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <Box mb={4}>
        {
          userState.role <= 1 &&
          <Button onClick={generateCode} sx={{ mr: 1 }} variant="outlined" startIcon={<LockIcon />}>
            动态码
          </Button>
        }
        <Button onClick={onSwitchMode} variant="outlined" startIcon={<InfoIcon />}>
          切换到{mode === 'off' ? '考勤' : '只读'}模式
        </Button>
      </Box>
      <Box component="div" display="flex" justifyContent="center" flexWrap="wrap" gap={1} onClick={handleClick}>
        {
          data.map(item => {
            return <GridItem key={item._id} {...item} />;
          })
        }
      </Box>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          动态码
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box display="flex" flexDirection="column">
            {
              userState.role <= 1 ? renderCode :
                mode === 'off' ? renderCodeInput :
                  <DialogContentText>
                    当前已经处于考勤模式，无需使用动态码
                  </DialogContentText>
            }
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>关闭</Button>
        </DialogActions>
      </Dialog>
    </div >
  );
};

export default Attendance;