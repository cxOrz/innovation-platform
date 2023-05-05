import { useCallback, useEffect, useMemo, useState } from 'react';
import { DataGrid, GridColDef, zhCN } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AddIcon from '@mui/icons-material/Add';
import useUserState from '../../hooks/useUserstate';
import DeviceCard from './DeviceCard/DeviceCard';
import axios from 'axios';
import { equal } from '../../Helper/helper';
import { device_ } from '../../configs/api';
import { useAppDispatch } from '../../hooks/redux';
import { updateSnackBar } from '../../stores/snackbar/snackbarSlice';

interface Device {
  _id: string;
  openid: string;
  name: string;
  type: string;
  price?: number;
  date: Date;
  note: string;
}

type Props = {};

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

const DeviceManagement = (props: Props) => {
  const [type, setType] = useState('pc');
  const dispatch = useAppDispatch();
  const [userState] = useUserState();
  const [data, setData] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<Device | null>(null);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
    total: 0
  });
  const columns = useMemo(() => {
    const cols: GridColDef[] = [
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
        sortable: false,
        editable: true,
      },
      {
        field: 'price',
        headerName: '价格',
        type: 'number',
        width: 110,
        editable: true,
        sortable: false
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
        editable: true
      },
      {
        field: 'operation',
        headerName: '操作',
        sortable: false,
        width: 160,
        renderCell: (params) => {
          return <>
            <Tooltip title="详情">
              <IconButton
                size="small"
                sx={{ mr: 1 }}
                onClick={() => {
                  setDetail(params.row);
                  setOpen(true);
                }}
              >
                <TextSnippetIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="下一流程">
              <IconButton
                size='small'
                sx={{ mr: 1 }}
                onClick={() => { processRowUpdate({ ...params.row, status: params.row.status + 1 }, params.row); }}
              >
                <SkipNextIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="终止">
              <IconButton
                size='small'
                onClick={() => { processRowUpdate({ ...params.row, status: -1 }, params.row); }}
              >
                <HighlightOffIcon />
              </IconButton>
            </Tooltip>
          </>;
        }
      }
    ];
    return cols;
  }, []);

  // 获取数据
  const fetchData = (page = 0, pageSize = 0) => {
    if (userState) {
      setLoading(true);
      axios.get(device_, {
        headers: { 'Authorization': userState?.token ? userState?.token : "" },
        params: {
          page,
          pageSize
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
      headers: { 'Authorization': userState?.token ? userState?.token : "" },
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

  const handleProcessRowUpdateError = useCallback((error: Error) => {
    dispatch(updateSnackBar({ open: true, message: error.message, severity: 'error' }));
  }, []);

  const handlePaginationModelChange = (m: any) => {
    setPaginationModel(prev => ({ ...m, total: prev.total }));
  };

  useEffect(() => {
    fetchData(paginationModel.page, paginationModel.pageSize);
  }, [userState]);

  useEffect(() => {
    fetchData(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel.page, paginationModel.pageSize]);


  return (
    <div>
      <Box display="flex" flexWrap="wrap" gap={2}>
        <DeviceCard type="pc" data={CardList[0]} onClick={setType} actived={type === 'pc'} style={{ backgroundPosition: '0% 10%' }} />
        <DeviceCard type="book" data={CardList[1]} onClick={setType} actived={type === 'book'} style={{ backgroundPosition: '60% 60%' }} />
        <DeviceCard type="equipment" data={CardList[2]} onClick={setType} actived={type === 'equipment'} style={{ backgroundPosition: '100% 100%' }} />
        <DeviceCard type="office-supplies" data={CardList[3]} onClick={setType} actived={type === 'office-supplies'} style={{ backgroundPosition: '80% 30%' }} />
      </Box>
      <Box textAlign="left" mt={2} mb={1}>
        <Button variant="outlined" startIcon={<AddIcon />}>添加</Button>
      </Box>
      <DataGrid
        loading={loading}
        getRowId={r => r._id}
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
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
    </div>
  );
};

export default DeviceManagement;