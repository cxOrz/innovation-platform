import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../../configs/types'
import { RootState } from '../../store'

interface UserSlice {
  data: User | null
}

const initialState: UserSlice = {
  data: {
    avatarUrl: "",
    email: "",
    nickName: "",
    openid: "",
    phone: "",
    uid: "",
    role: 2,
    token: ""
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state: UserSlice, action: PayloadAction<User>) => {
      state.data = action.payload
    },
    updateAvatar: (state: UserSlice, action: PayloadAction<string>) => {
      state.data!.avatarUrl = action.payload
    },
  },
})

export const { updateUser, updateAvatar } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer