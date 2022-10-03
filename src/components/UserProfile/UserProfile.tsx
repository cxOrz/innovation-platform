import React, { useEffect, useRef, useState } from 'react'
import styles from './UserProfile.module.css'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import useErrorMsg from '../../hooks/useErrorMsg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectUser, updateAvatar, updateUser } from '../../stores/user/userSlice';
import { updateSnackBar } from '../../stores/snackbar/snackbarSlice';
import axios from 'axios';
import { user_update, user_upload } from '../../configs/api';

interface Props { }

interface InputRefs {
  file: HTMLInputElement | null,
  uploadBtn: HTMLButtonElement | null
}

const UserProfile = (props: Props) => {
  const userState = useAppSelector(selectUser);
  const [nickNameError, setNickNameError] = useErrorMsg(['', '昵称长度为0-14个字符，包括汉字、字母、数字']);
  const [uploadProgress, setUploadProgress] = useState(false);
  const [nickName, setNickName] = useState('');
  const refs = useRef<InputRefs>({
    file: null,
    uploadBtn: null
  })
  const dispatch = useAppDispatch();

  function uploadAvatar() {
    refs.current.uploadBtn!.disabled = true;
    setUploadProgress(true);
    // 上传头像文件
    const formdata = new FormData();
    formdata.append('type', '0');
    formdata.append('file', refs.current.file!.files![0]);
    axios.post(user_upload, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': userState.data?.token || ""
      }
    }).then((res) => {
      dispatch(updateAvatar(res.data.data));
      localStorage.setItem('avatarUrl', res.data.data);
      setUploadProgress(false);
      refs.current.uploadBtn!.disabled = false;
    });
  }

  function updateProfile() {
    if (nickName.match(/^(?!-)[a-zA-Z0-9_\u4e00-\u9fa5]{0,14}$/g)) {
      axios.post(user_update, {
        nickName: nickName
      }, {
        headers: { 'Authorization': userState.data?.token ? userState.data?.token : "" }
      });
      setNickNameError(0, false);
      dispatch(updateUser({ ...(userState.data) as any, nickName }));
      dispatch(updateSnackBar({ severity: 'success', open: true, message: '修改成功' }));
    } else {
      setNickNameError(1, true);
    }
  }

  useEffect(() => {
    setNickName(userState.data!.nickName as string);
  }, [userState.data?.nickName]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>我的资料</h1>
      <p className={styles.hero_paragraph}>你好，在这里可以对你的个人资料进行管理~</p>
      <div className={styles.content}>
        <h3>用户头像</h3>
        <div className={styles.avatar_section}>
          <img className={styles.avatar} src={userState.data?.avatarUrl} />
          <Button ref={ref => refs.current.uploadBtn = ref} sx={{ ml: '1rem' }} onClick={() => { refs.current.file!.click() }} variant='outlined' disableElevation>
            {uploadProgress && <CircularProgress size='16px' />}上传图片
          </Button>
          <input onChange={() => { uploadAvatar() }} ref={ref => refs.current.file = ref} hidden type='file' accept='image/jpeg,image/jpg,image/png,image/webp' />
        </div>
        <p className={styles.hero_paragraph}>上传一张图片作为头像，推荐尺寸为 256x256 px</p>
        <Box className={styles.info_section} sx={{
          '& .MuiTextField-root': {
            my: 1
          }
        }}>
          <TextField size='small' label="手机号码" value={userState.data?.phone} sx={{ width: '290px' }} />
          <TextField error={nickNameError.status} helperText={nickNameError.msg} size='small' label="昵称"
            sx={{ width: '290px' }} onChange={e => setNickName(e.target.value)} value={nickName} />
        </Box>
        <Button variant='contained' disableElevation onClick={updateProfile}>更新资料</Button>
      </div>
    </div>
  )
}

export default UserProfile