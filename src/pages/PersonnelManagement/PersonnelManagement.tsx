import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid, GridColDef, GridFilterModel, GridToolbarContainer, GridToolbarQuickFilter, zhCN } from '@mui/x-data-grid';
import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import XLSX from 'xlsx';
import { equal, filterGridData } from '../../Helper/helper';
import { personnel_ } from '../../configs/api';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateSnackBar } from '../../stores/snackbar/snackbarSlice';
import { selectUser } from '../../stores/user/userSlice';

type Personnel = User & UserExt;

const PrivilegeItems = [
  { label: '超级管理员', value: 0 },
  { label: '普通管理员', value: 1 },
  { label: '内部成员', value: 2 },
  { label: '普通用户', value: 3 }
];

export default function PersonnelManagement() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(selectUser).data;
  const [data, setData] = useState<Personnel[]>([]);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
    total: 0,
    searchParams: {}
  });
  const columns = useMemo(() => {
    const cols: GridColDef[] = [
      {
        field: 'email',
        headerName: '邮箱',
        width: 150,
        sortable: false
      },
      {
        field: 'idNo',
        headerName: '学号',
        width: 150,
        sortable: true,
        editable: true
      },
      {
        field: 'realname',
        headerName: '姓名',
        width: 100,
        sortable: false,
        editable: true
      },
      {
        field: 'gendor',
        headerName: '性别',
        width: 80,
        sortable: false,
        editable: true
      },
      {
        field: 'phone',
        headerName: '手机号码',
        width: 110,
        sortable: false,
        editable: true
      },
      {
        field: 'major',
        headerName: '专业',
        width: 130,
        sortable: false,
        editable: true
      },
      {
        field: 'academy',
        headerName: '学院',
        width: 130,
        sortable: false,
        editable: true
      },
      {
        field: 'field',
        headerName: '领域',
        width: 130,
        sortable: false,
        editable: true
      },
      {
        field: 'role',
        headerName: '权限设置',
        width: 110,
        type: 'singleSelect',
        valueOptions: PrivilegeItems,
        editable: true,
        sortable: false
      },
      {
        field: 'operation',
        headerName: '操作',
        sortable: false,
        width: 100,
        renderCell: (params) => {
          return <>
            <Tooltip title="删除">
              <IconButton size='small' onClick={() => { deleteRow(params.row.uid); }}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>;
        }
      }
    ];
    return cols;
  }, [userState]);

  function CustomToolbar() {
    const handleExport = () => {
      axios.get(personnel_, {
        headers: { 'Authorization': userState.token }
      }).then(res => {
        const result = res.data;
        if (result.code === 200) {
          // 过滤需要的字段
          const exportData = filterGridData(result.data, [
            {
              field: 'email',
              headerName: '邮箱',
            },
            {
              field: 'nickName',
              headerName: '昵称',
            },
            {
              field: 'realname',
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
              field: 'idNo',
              headerName: '学号',
            },
            {
              field: 'major',
              headerName: '专业',
            },
            {
              field: 'field',
              headerName: '领域',
            },
            {
              field: 'role',
              headerName: '权限等级',
            }
          ]);

          const worksheet = XLSX.utils.json_to_sheet(exportData);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet);
          worksheet["!cols"] = [{ wch: 20 }, { wch: 8 }, { wch: 8 }, { wch: 8 }, { wch: 12 }, { wch: 12 }];
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
    setLoading(true);
    axios.get(personnel_, {
      headers: { 'Authorization': userState.token },
      params: {
        ...paginationModel.searchParams,
        page,
        pageSize
      }
    }).then(res => {
      setLoading(false);
      setPaginationModel({
        page,
        pageSize,
        total: res.data.total,
        searchParams: paginationModel.searchParams
      });
      setData(res.data.data);
    });
  };

  const processRowUpdate = useCallback(async (newRow: Personnel, oldRow: Personnel) => {
    const payload: any = {};
    if (newRow.idNo !== oldRow.idNo) payload.idNo = newRow.idNo;
    if (newRow.realname !== oldRow.realname) payload.realname = newRow.realname;
    if (newRow.gendor !== oldRow.gendor) payload.gendor = newRow.gendor;
    if (newRow.phone !== oldRow.phone) payload.phone = newRow.phone;
    if (newRow.major !== oldRow.major) payload.major = newRow.major;
    if (newRow.academy !== oldRow.academy) payload.academy = newRow.academy;
    if (newRow.field !== oldRow.field) payload.field = newRow.field;
    if (newRow.role !== oldRow.role) {
      payload.role = newRow.role;
      // 若修改权限，必带上姓名
      payload.realname = oldRow.realname;
    }
    // 若payload为空，说明无任何修改，返回oldRow
    if (equal(payload, {})) return oldRow;
    payload.uid = newRow.uid;

    dispatch(updateSnackBar({ open: true, message: '提交数据中...', severity: 'info' }));
    const { data } = await axios.put(personnel_, payload, {
      headers: { 'Authorization': userState.token },
    });
    if (data.code === 200) {
      dispatch(updateSnackBar({ open: true, message: '提交成功', severity: 'success' }));
      setData((prev) => prev.map(item => {
        if (item.uid === newRow.uid) return { ...newRow };
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
    const { data: result } = await axios.get(personnel_, {
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

  const deleteRow = (uid: string) => {
    axios.delete(`${personnel_}/${uid}`, {
      headers: { 'Authorization': userState.token }
    }).then(res => {
      if (res.data.code === 204) {
        fetchData(0, paginationModel.pageSize);
      }
    });
  };

  useEffect(() => {
    fetchData(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel.page, paginationModel.pageSize]);

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <DataGrid
        loading={loading}
        getRowId={r => r.uid}
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
        paginationMode="server"
        paginationModel={paginationModel}
        filterMode="server"
        onFilterModelChange={onFilterChange}
        onPaginationModelChange={handlePaginationModelChange}
        pageSizeOptions={[5, 10, 25]}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
        disableRowSelectionOnClick
      />
    </Box>
  );
}