import type { AlertColor } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../../store'

interface SnackBarSlice {
  open: boolean
  message: string
  severity: AlertColor | undefined
}
export const initialSnackbarState: SnackBarSlice = {
  open: false,
  message: '',
  severity: 'info'
}

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: initialSnackbarState,
  reducers: {
    updateSnackBar: (state: SnackBarSlice, action: PayloadAction<SnackBarSlice>) => {
      state.open = action.payload.open
      state.message = action.payload.message
      state.severity = action.payload.severity
    }
  }
})

export const { updateSnackBar } = snackbarSlice.actions

export const selectSnackBar = (state: RootState) => state.snackbar

export default snackbarSlice.reducer