import { useCallback, useEffect, useMemo, useState } from 'react';
import { DataGrid, GridColDef, zhCN } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DeviceCard from './DeviceCard/DeviceCard';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { equal } from '../../Helper/helper';
import { device_ } from '../../configs/api';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateSnackBar } from '../../stores/snackbar/snackbarSlice';
import { selectUser } from '../../stores/user/userSlice';

interface Device {
  _id: string;
  openid: string;
  name: string;
  type: string;
  price: number | '';
  date: Date;
  note: string;
}

type DevicePayloadType = Omit<Device, '_id' | 'openid' | 'date'>;

const defaultDevice: DevicePayloadType = {
  name: '',
  type: '',
  price: '',
  note: ''
};

const typeItems = [
  { label: '电脑设备&配件', value: 'pc' },
  { label: '书籍', value: 'book' },
  { label: '实验器材', value: 'equipment' },
  { label: '办公用品', value: 'office-supplies' }
];

const CardList = [
  {
    title: '电脑设备 & 配件',
    subtitle: '主机/硬盘/内存条/显示器',
    img: '/assets/icons/pc.webp'
  },
  {
    title: '书籍',
    subtitle: '教材/技术/课外',
    img: '/assets/icons/books.webp'
  },
  {
    title: '实验器材',
    subtitle: '实验箱/机器人',
    img: '/assets/icons/dlb.webp'
  },
  {
    title: '办公用品',
    subtitle: '订书机/胶带/打印纸/硒鼓',
    img: '/assets/icons/printer.webp'
  },
];

const DeviceManagement = () => {
  const [type, setType] = useState('pc');
  const dispatch = useAppDispatch();
  const userState = useAppSelector(selectUser).data;
  const [data, setData] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<DevicePayloadType>(defaultDevice);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
    total: 0
  });
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: '名称',
      width: 150,
      editable: true,
      sortable: true
    },
    {
      field: 'type',
      headerName: '类型',
      width: 130,
      type: 'singleSelect',
      valueOptions: typeItems,
      sortable: false,
      editable: true
    },
    {
      field: 'price',
      headerName: '价格',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'date',
      headerName: '统计日期',
      type: 'date',
      width: 110,
      valueGetter(params) {
        return new Date(params.value);
      },
    },
    {
      field: 'note',
      headerName: '备注',
      width: 300,
      editable: true,
      sortable: false
    },
    {
      field: 'operation',
      headerName: '操作',
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return <>
          <Tooltip title="删除">
            <IconButton size='small' onClick={() => { deleteRow(params.row._id); }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>;
      }
    }
  ];

  // 获取数据
  const fetchData = (page = 0, pageSize = 0, type = 'pc') => {
    if (userState) {
      setLoading(true);
      axios.get(device_, {
        headers: { 'Authorization': userState.token },
        params: {
          page,
          pageSize,
          type
        }
      }).then(res => {
        setLoading(false);
        if (res.data.code === 200) {
          setPaginationModel({ ...paginationModel, total: res.data.total });
          setData(res.data.data);
        }
      });
    }
  };

  const addRow = () => {
    axios.post(device_, detail, {
      headers: { 'Authorization': userState.token }
    }).then(res => {
      if (res.data.code === 200) {
        fetchData(paginationModel.page, paginationModel.pageSize, type);
        dispatch(updateSnackBar({ open: true, message: '添加成功', severity: 'success' }));
      } else {
        dispatch(updateSnackBar({ open: true, message: res.data.data, severity: 'error' }));
      }
      handleClose();
    });
  };

  const processRowUpdate = useCallback(async (newRow: Device, oldRow: Device) => {
    const payload: any = {};
    if (newRow.name !== oldRow.name) payload.name = newRow.name;
    if (newRow.type !== oldRow.type) payload.type = newRow.type;
    if (newRow.price !== oldRow.price) payload.price = newRow.price;
    if (newRow.note !== oldRow.note) payload.note = newRow.note;
    // 若payload为空，说明无任何修改，返回oldRow
    if (equal(payload, {})) return oldRow;
    payload._id = newRow._id;

    // 验证
    if (payload.price < 0) { throw Error('价格有误'); }

    dispatch(updateSnackBar({ open: true, message: '提交数据中...', severity: 'info' }));
    const { data } = await axios.put(device_, payload, {
      headers: { 'Authorization': userState.token },
    });
    if (data.code === 200) {
      dispatch(updateSnackBar({ open: true, message: '提交成功', severity: 'success' }));
      setData((prev) => prev.map(item => {
        if (item._id === newRow._id) return { ...newRow };
        else return item;
      }));
      return newRow;
    } else throw Error('数据提交失败');
  }, []);

  const deleteRow = async function (_id: string) {
    axios.delete(`${device_}/${_id}`, {
      headers: { 'Authorization': userState.token }
    }).then(res => {
      if (res.data.code === 204) {
        fetchData(paginationModel.page, paginationModel.pageSize, type);
        dispatch(updateSnackBar({ open: true, message: '删除成功', severity: 'success' }));
      } else {
        dispatch(updateSnackBar({ open: true, message: '删除失败', severity: 'error' }));
      }
    });
  };

  const handleProcessRowUpdateError = useCallback((error: Error) => {
    dispatch(updateSnackBar({ open: true, message: error.message, severity: 'error' }));
  }, []);

  const handlePaginationModelChange = (m: any) => {
    setPaginationModel(prev => ({ ...m, total: prev.total }));
  };

  const handleClose = () => {
    setOpen(false);
    setDetail(defaultDevice);
  };

  useEffect(() => {
    fetchData(paginationModel.page, paginationModel.pageSize, type);
  }, [userState, paginationModel.page, paginationModel.pageSize, type]);

  return (
    <Box overflow="hidden" >
      <Box display="flex" flexWrap="wrap" p={1} gap={2}>
        <DeviceCard type="pc" data={CardList[0]} onClick={setType} actived={type === 'pc'} style={{ backgroundPosition: '0% 10%' }} />
        <DeviceCard type="book" data={CardList[1]} onClick={setType} actived={type === 'book'} style={{ backgroundPosition: '60% 60%' }} />
        <DeviceCard type="equipment" data={CardList[2]} onClick={setType} actived={type === 'equipment'} style={{ backgroundPosition: '100% 100%' }} />
        <DeviceCard type="office-supplies" data={CardList[3]} onClick={setType} actived={type === 'office-supplies'} style={{ backgroundPosition: '80% 30%' }} />
      </Box>
      <Box textAlign="left" p={1} mt={2}>
        <Button onClick={() => { setOpen(true); }} variant="outlined" startIcon={<AddIcon />}>添加</Button>
      </Box>
      <Box p={1}>
        <DataGrid
          sx={{ height: 400 }}
          loading={loading}
          getRowId={r => r._id}
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              }
            }
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          rowCount={paginationModel.total}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationModelChange}
          pageSizeOptions={[5, 10, 25]}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
          disableRowSelectionOnClick
        />
      </Box>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          添加
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box display="flex" flexDirection="column">
            <TextField
              label="名称"
              margin="dense"
              type='text'
              value={detail?.name}
              onChange={(e) => {
                setDetail(prev => ({ ...prev, name: e.target.value }));
              }}
            />
            <TextField
              select
              label="类型"
              margin="dense"
              value={detail?.type}
              onChange={(e) => {
                setDetail(prev => ({ ...prev, type: e.target.value }));
              }}
            >
              {typeItems.map(option =>
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              )}
            </TextField>
            <TextField
              label="价格"
              margin="dense"
              type="number"
              value={detail?.price}
              onChange={(e) => {
                setDetail(prev => ({ ...prev, price: Number(e.target.value) }));
              }}
            />
            <TextField
              label="备注"
              margin="dense"
              value={detail?.note}
              onChange={(e) => {
                setDetail(prev => ({ ...prev, note: e.target.value }));
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>取消</Button>
          <Button variant="outlined" onClick={addRow}>添加</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeviceManagement;