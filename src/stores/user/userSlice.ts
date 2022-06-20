import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { TCBUser } from '../../configs/types'
import { RootState } from '../../store'

interface UserSlice {
  data: TCBUser | null
}

const initialState: UserSlice = {
  data: {
    avatarUrl: "",
    customUserId: "",
    email: "",
    gender: "",
    hasPassword: false,
    location: { country: '', province: '', city: '' },
    loginType: "PHONE",
    nickName: "",
    openid: "",
    phone: "",
    qqMiniOpenId: "",
    uid: "",
    unionId: "",
    username: "",
    wxOpenId: "",
    wxPublicId: "",
    role: 1
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state: UserSlice, action: PayloadAction<TCBUser>) => {
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