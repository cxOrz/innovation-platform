import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';

interface ToolBarProps {
  getOrders: (range?: 'all' | 'my') => void;
}

const Toolbar = (props: ToolBarProps) => {
  const [torch, setTorch] = useState(false);

  // 更新或渲染后读取工单获取范围，并设置；若无范围，则写入“my”作为范围；
  useEffect(() => {
    const range = localStorage.getItem('getOrdersRange');
    setTorch(true);
    if (range === 'all') {
      setTorch(true);
    } else if (range === 'my') {
      setTorch(false);
    } else {
      localStorage.setItem('getOrdersRange', 'my');
    }
  }, []);

  /**
   * 
   * 切换时，将当前值写入localstorage
   */
  function handleSwitchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTorch(e.currentTarget.checked);
    if (e.currentTarget.checked) {
      props.getOrders('all');
      localStorage.setItem('getOrdersRange', 'all');
    } else {
      props.getOrders('my');
      localStorage.setItem('getOrdersRange', 'my');
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
};

export default Toolbar;