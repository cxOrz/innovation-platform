import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import JoinStatus from './JoinStatus/JoinStatus';
import axios from 'axios';
import { joinus_, joinus_status } from '../../configs/api';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectUser } from '../../stores/user/userSlice';
import { updateSnackBar } from '../../stores/snackbar/snackbarSlice';

const defaultApplication: Application = {
  name: '',
  gendor: '',
  phone: '',
  academy: '',
  major: '',
  idNo: '',
  honors: '',
  self_eval: '',
  comments: ''
};

const gendorItems = [
  { label: '男', value: '男' },
  { label: '女', value: '女' },
  { label: '武装直升机', value: '武装直升机' },
  { label: '其他', value: '其他' }
];

const academyList = [
  { label: '软件学院', value: '软件学院' },
  { label: '计通学院', value: '计通学院' },
  { label: '其他', value: '其他' },
];

const JoinUs = () => {
  const userState = useAppSelector(selectUser).data;
  const dispatch = useAppDispatch();
  const [activeStep, setActiveStep] = useState<null | number>(null);
  const [form, setForm] = useState<Application>(defaultApplication);
  const [formStatus, setFormStatus] = useState(false);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();

  // 提交申请
  const submit = () => {
    setFormStatus(true);
    axios.post(joinus_, form, {
      headers: { 'Authorization': userState?.token ? userState?.token : "" }
    }).then(res => {
      switch (res.data.code) {
        case 200: { setActiveStep(0); break; }
      }
      setFormStatus(false);
    });
  };

  // 获取状态
  useEffect(() => {
    if (userState.token !== '') {
      axios.get(joinus_status, {
        headers: { 'Authorization': userState?.token ? userState?.token : "" }
      }).then((res) => {
        switch (res.data.code) {
          case 200: { setActiveStep(Number(res.data.data)); break; }
          case 404: { setActiveStep(null); break; }
          default: setActiveStep(null);
        }
        setFetching(false);
      });
    } else {
      dispatch(updateSnackBar({ open: true, message: '请先登录', severity: 'warning' }));
      navigate('/user/profile');
    }
  }, []);

  return (
    <Box sx={{ my: 4 }} textAlign="left">
      {
        fetching ?
          <Box>
            <CircularProgress />
          </Box>
          :
          activeStep === null ?
            <Box maxWidth={500}>
              <Box mb={2}>
                <Typography sx={{ fontWeight: 600 }} variant='h4' gutterBottom>
                  加入我们
                </Typography>
                <Typography variant='subtitle1'>
                  在这里填写你的申请信息，并提交给我们，我们会在收到后第一时间处理！请务必确保手机号填写正确，以便我们联系你。
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column">
                <FormControl fullWidth component="form">
                  <FormControlLabel
                    sx={{ alignItems: 'baseline', mx: 0, mb: 2 }}
                    label="姓名"
                    labelPlacement="top"
                    control={
                      <TextField
                        fullWidth
                        type='text'
                        value={form?.name}
                        onChange={(e) => {
                          setForm(prev => ({ ...prev, name: e.target.value }));
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    sx={{ alignItems: 'baseline', mx: 0, mb: 2 }}
                    label="性别"
                    labelPlacement="top"
                    control={
                      <TextField
                        select
                        fullWidth
                        value={form?.gendor}
                        onChange={(e) => {
                          setForm(prev => ({ ...prev, gendor: e.target.value }));
                        }}
                      >
                        {gendorItems.map(option =>
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        )}
                      </TextField>
                    }
                  />
                  <FormControlLabel
                    sx={{ alignItems: 'baseline', mx: 0, mb: 2 }}
                    label="电话"
                    labelPlacement="top"
                    control={
                      <TextField
                        fullWidth
                        type='tel'
                        value={form?.phone}
                        onChange={(e) => {
                          setForm(prev => ({ ...prev, phone: e.target.value }));
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    sx={{ alignItems: 'baseline', mx: 0, mb: 2 }}
                    label="学院"
                    labelPlacement="top"
                    control={
                      <TextField
                        select
                        fullWidth
                        value={form?.academy}
                        onChange={(e) => {
                          setForm(prev => ({ ...prev, academy: e.target.value }));
                        }}
                      >
                        {academyList.map(option =>
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        )}
                      </TextField>
                    }
                  />
                  <FormControlLabel
                    sx={{ alignItems: 'baseline', mx: 0, mb: 2 }}
                    label="专业"
                    labelPlacement="top"
                    control={
                      <TextField
                        fullWidth
                        type='text'
                        value={form?.major}
                        onChange={(e) => {
                          setForm(prev => ({ ...prev, major: e.target.value }));
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    sx={{ alignItems: 'baseline', mx: 0, mb: 2 }}
                    label="学号"
                    labelPlacement="top"
                    control={
                      <TextField
                        fullWidth
                        type='text'
                        value={form?.idNo}
                        onChange={(e) => {
                          setForm(prev => ({ ...prev, idNo: e.target.value }));
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    sx={{ alignItems: 'baseline', mx: 0, mb: 2 }}
                    label="荣誉经历(可选)"
                    labelPlacement="top"
                    control={
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        type='text'
                        value={form?.honors}
                        onChange={(e) => {
                          setForm(prev => ({ ...prev, honors: e.target.value }));
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    sx={{ alignItems: 'baseline', mx: 0, mb: 2 }}
                    label="自我评价(可选)"
                    labelPlacement="top"
                    control={
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        type='text'
                        value={form?.self_eval}
                        onChange={(e) => {
                          setForm(prev => ({ ...prev, self_eval: e.target.value }));
                        }}
                      />
                    }
                  />
                  <FormControlLabel
                    sx={{ alignItems: 'baseline', mx: 0, mb: 2 }}
                    label="有什么想对我们说的(可选)"
                    labelPlacement="top"
                    control={
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        type='text'
                        value={form?.comments}
                        onChange={(e) => {
                          setForm(prev => ({ ...prev, comments: e.target.value }));
                        }}
                      />
                    }
                  />
                </FormControl>
                <Button disabled={formStatus} onClick={submit} variant="outlined">提交</Button>
              </Box>
            </Box>
            :
            <JoinStatus status={activeStep} />
      }
    </Box>
  );
};

export default JoinUs;