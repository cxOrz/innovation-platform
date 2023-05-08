import React, { ReactEventHandler, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';
import { attendance_ } from '../../configs/api';
import { useAppSelector } from '../../hooks/redux';
import { selectUser } from '../../stores/user/userSlice';
import GridItem from './GridItem/GridItem';

interface ItemType {
  _id: string;
  realname: string;
  total: number;
  today: number;
  on: boolean;
}

const Attendance = () => {
  const userState = useAppSelector(selectUser).data;
  const [data, setData] = useState<ItemType[]>([]);

  // On & Off
  const handleClick = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = ev.target as HTMLElement;
    const box: HTMLElement | null = target.closest('div[data-on]');
    if (box) {
      console.log(box.dataset.on);
      // Send on:true or on:false request.
    }
  };

  // For Admin
  const generateCode = () => { };

  // For Common Member
  const verifyCode = () => { };

  // Switch action for any user
  // Common member needs code, admin do not need.
  const onSwitchMode = () => { };

  useEffect(() => {
    axios.get(attendance_, {
      headers: { 'Authorization': userState.token },
    }).then(res => {
      console.log(res.data.data);
      setData(res.data.data);
    });
  }, []);

  return (
    <div>
      {/* <Typography variant="h4">考勤大屏</Typography> */}
      <Box component="div" display="flex" flexWrap="wrap" gap={1} onClick={handleClick}>
        {
          data.map(item => {
            return <GridItem key={item._id} {...item} />;
          })
        }
      </Box>
    </div>
  );
};

export default Attendance;