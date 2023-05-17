import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import XLSX from 'xlsx';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import GetAppIcon from '@mui/icons-material/GetApp';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import { DataGrid, GridColDef, GridFilterModel, GridToolbarQuickFilter, GridToolbarContainer, zhCN } from '@mui/x-data-grid';
import { joinus_ } from '../../configs/api';
import { updateSnackBar } from '../../stores/snackbar/snackbarSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { equal, filterGridData } from '../../Helper/helper';
import { selectUser } from '../../stores/user/userSlice';

type ApplicationDetail = Application & {
  _id: string;
  exam_score: number;
  interview_score: number;
  status: number;
  note: string;
};

function getStatus(status = 6) {
  switch (status) {
    case -1: { return '终止'; }
    case 0: { return '提交申请'; }
    case 1: { return '初筛'; }
    case 2: { return '笔试'; }
    case 3: { return '复筛'; }
    case 4: { return '面试'; }
    case 5: { return '意向通知'; }
    default: return '状态错误';
  }
}

export default function JoinUsManagement() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(selectUser).data;
  const [data, setData] = useState<ApplicationDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<ApplicationDetail | null>(null);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
    total: 0,
    searchParams: {}
  });
  const columns = useMemo(() => {
    const cols: GridColDef[] = [
      {
        field: 'idNo',
        headerName: '学号',
        width: 150,
        sortable: true
      },
      {
        field: 'name',
        headerName: '姓名',
        width: 100,
        sortable: false
      },
      {
        field: 'gendor',
        headerName: '性别',
        width: 80,
        sortable: false
      },
      {
        field: 'phone',
        headerName: '手机号码',
        width: 150,
        sortable: false
      },
      {
        field: 'major',
        headerName: '专业',
        width: 130,
        sortable: false
      },
      {
        field: 'exam_score',
        headerName: '笔试分数',
        headerAlign: 'left',
        align: 'left',
        type: 'number',
        width: 110,
        editable: true
      },
      {
        field: 'interview_score',
        headerName: '面试评分',
        type: 'number',
        headerAlign: 'left',
        align: 'left',
        width: 110,
        editable: true
      },
      {
        field: 'status',
        headerName: '流程状态',
        width: 110,
        type: 'singleSelect',
        valueOptions: [
          { value: -1, label: '终止' },
          { value: 0, label: '提交申请' },
          { value: 1, label: '初筛' },
          { value: 2, label: '笔试' },
          { value: 3, label: '复筛' },
          { value: 4, label: '面试' },
          { value: 5, label: '意向通知' },
        ],
        editable: true,
        sortable: false
      },
      {
        field: 'note',
        headerName: '备注',
        width: 150,
        editable: true
      },
      {
        field: 'operation',
        headerName: '操作',
        sortable: false,
        width: 300,
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

  function CustomToolbar() {
    const handleExport = () => {
      axios.get(joinus_, {
        headers: { 'Authorization': userState.token }
      }).then(res => {
        const result = res.data;
        if (result.code === 200) {
          // 过滤需要的字段
          const exportData = filterGridData(result.data, [
            {
              field: 'idNo',
              headerName: '学号',
            },
            {
              field: 'name',
              headerName: '姓名',
            },
            {
              field: 'gendor',
              headerName: '性别',
            },
            {
              field: 'phone',
              headerName: '手机号码',
            },
            {
              field: 'email',
              headerName: '邮箱',
            },
            {
              field: 'major',
              headerName: '专业',
            },
            {
              field: 'exam_score',
              headerName: '笔试分数',
            },
            {
              field: 'interview_score',
              headerName: '面试评分',
            },
            {
              field: 'honors',
              headerName: '荣誉经历',
            },
            {
              field: 'self_eval',
              headerName: '自我评价',
            },
            {
              field: 'comments',
              headerName: '留言',
            },
            {
              field: 'status',
              headerName: '流程状态',
              filterCallback(dataItem) {
                return getStatus(dataItem.status);
              },
            },
            {
              field: 'note',
              headerName: '备注',
            }
          ]);

          const worksheet = XLSX.utils.json_to_sheet(exportData);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet);
          worksheet["!cols"] = [{ wch: 13 }, { wch: 8 }, { wch: 8 }, { wch: 12 }, { wch: 20 }];
          XLSX.writeFile(workbook, "招新表.xlsx", { compression: true });
        }
      });
    };

    return (
      <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={handleExport} startIcon={<GetAppIcon />}>导出</Button>
        <GridToolbarQuickFilter />
      </GridToolbarContainer>
    );
  }

  // 获取数据
  const fetchData = (page = 0, pageSize = 0) => {
    if (userState) {
      setLoading(true);
      axios.get(joinus_, {
        headers: { 'Authorization': userState.token },
        params: {
          ...paginationModel.searchParams,
          page,
          pageSize
        }
      }).then(res => {
        setLoading(false);
        setPaginationModel({
          ...paginationModel,
          total: res.data.total
        });
        setData(res.data.data);
      });
    }
  };

  const processRowUpdate = useCallback(async (newRow: ApplicationDetail, oldRow: ApplicationDetail) => {
    const payload: any = {};
    if (newRow.exam_score !== oldRow.exam_score) payload.exam_score = newRow.exam_score;
    if (newRow.interview_score !== oldRow.interview_score) payload.interview_score = newRow.interview_score;
    if (newRow.status !== oldRow.status) payload.status = newRow.status;
    if (newRow.note !== oldRow.note) payload.note = newRow.note;
    // 若payload为空，说明无任何修改，返回oldRow
    if (equal(payload, {})) return oldRow;
    payload._id = newRow._id;

    // 验证
    if (payload.exam_score > 100 || payload.exam_score < 0) { throw Error('笔试分数输入有误'); }
    if (payload.interview_score > 100 || payload.interview_score < 0) { throw Error('面试评分输入有误'); }
    if (payload.status === 6) { throw Error('流程已处于最后阶段'); }

    dispatch(updateSnackBar({ open: true, message: '提交数据中...', severity: 'info' }));
    const { data } = await axios.put(joinus_, payload, {
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

  const handleProcessRowUpdateError = useCallback((error: Error) => {
    dispatch(updateSnackBar({ open: true, message: error.message, severity: 'error' }));
  }, []);

  const handlePaginationModelChange = (m: any) => {
    setPaginationModel(prev => ({ ...m, total: prev.total }));
  };

  const onFilterChange = useCallback(async (filterModel: GridFilterModel) => {
    const payload: any = {};
    if (filterModel.quickFilterValues) {
      payload.search = filterModel.quickFilterValues[0];
    }
    setPaginationModel({
      ...paginationModel,
      searchParams: {
        ...payload
      }
    });
    const { data: result } = await axios.get(joinus_, {
      headers: { 'Authorization': userState.token },
      params: {
        ...payload,
        page: paginationModel.page,
        pageSize: paginationModel.pageSize
      }
    });
    if (result.code === 200) {
      setPaginationModel(prev => ({ ...prev, page: 0, total: result.total }));
      setData(result.data);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchData(paginationModel.page, paginationModel.pageSize);
  }, [userState, paginationModel.page, paginationModel.pageSize]);

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
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
        slots={{ toolbar: CustomToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        rowCount={paginationModel.total}
        filterMode="server"
        onFilterModelChange={onFilterChange}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        pageSizeOptions={[5, 10, 25]}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
        disableRowSelectionOnClick
      />
      <Dialog
        sx={{ height: '95%' }}
        fullWidth
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          详情
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box component="div" mb={1}>
            <Typography sx={{ fontSize: '1.125rem' }} fontWeight="600">学号</Typography>
            <Typography>{detail?.idNo}</Typography>
          </Box>
          <Divider />
          <Box component="div" my={1}>
            <Typography sx={{ fontSize: '1.125rem' }} fontWeight="600">姓名</Typography>
            <Typography>{detail?.name}</Typography>
          </Box>
          <Divider />
          <Box component="div" my={1}>
            <Typography sx={{ fontSize: '1.125rem' }} fontWeight="600">性别</Typography>
            <Typography>{detail?.gendor}</Typography>
          </Box>
          <Divider />
          <Box component="div" my={1}>
            <Typography sx={{ fontSize: '1.125rem' }} fontWeight="600">手机</Typography>
            <Typography>{detail?.phone}</Typography>
          </Box>
          <Divider />
          <Box component="div" my={1}>
            <Typography sx={{ fontSize: '1.125rem' }} fontWeight="600">专业</Typography>
            <Typography>{`${detail?.academy} - ${detail?.major}`}</Typography>
          </Box>
          <Divider />
          <Box component="div" my={1}>
            <Typography sx={{ fontSize: '1.125rem' }} fontWeight="600">笔试分数</Typography>
            <Typography>{detail?.exam_score}</Typography>
          </Box>
          <Divider />
          <Box component="div" my={1}>
            <Typography sx={{ fontSize: '1.125rem' }} fontWeight="600">面试评分</Typography>
            <Typography>{detail?.interview_score}</Typography>
          </Box>
          <Divider />
          <Box component="div" my={1}>
            <Typography sx={{ fontSize: '1.125rem' }} fontWeight="600">流程状态</Typography>
            <Typography>{getStatus(detail?.status)}</Typography>
          </Box>
          <Divider />
          <Box component="div" my={1}>
            <Typography sx={{ fontSize: '1.125rem' }} fontWeight="600">荣誉经历</Typography>
            <Typography whiteSpace="pre-line">{detail?.honors}</Typography>
          </Box>
          <Divider />
          <Box component="div" my={1}>
            <Typography sx={{ fontSize: '1.125rem' }} fontWeight="600">自我评价</Typography>
            <Typography whiteSpace="pre-line">{detail?.self_eval}</Typography>
          </Box>
          <Divider />
          <Box component="div" my={1}>
            <Typography sx={{ fontSize: '1.125rem' }} fontWeight="600">留言</Typography>
            <Typography whiteSpace="pre-line">{detail?.comments}</Typography>
          </Box>
          <Divider />
          <Box component="div" my={1}>
            <Typography sx={{ fontSize: '1.125rem' }} fontWeight="600">备注</Typography>
            <Typography whiteSpace="pre-line">{detail?.note}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>关闭</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}