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
}

const Attendance = () => {
  const userState = useAppSelector(selectUser).data;
  const [data, setData] = useState<ItemType[]>([]);

  const handleClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    console.log(ev);
  };

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
            return <GridItem key={item._id} on={true} {...item} />;
          })
        }
      </Box>
    </div>
  );
};

export default Attendance;