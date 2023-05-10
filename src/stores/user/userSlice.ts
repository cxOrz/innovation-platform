import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface UserSlice {
  data: User & UserExt;
}

const initialState: UserSlice = {
  data: {
    uid: "",
    avatarUrl: "",
    role: 3,
    token: "",
    email: "",
    nickName: "",
    phone: ""
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state: UserSlice, action: PayloadAction<User & UserExt>) => {
      state.data = action.payload;
    },
    updateAvatar: (state: UserSlice, action: PayloadAction<string>) => {
      state.data!.avatarUrl = action.payload;
    },
  },
});

export const { updateUser, updateAvatar } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;