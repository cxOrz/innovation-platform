import { configureStore } from '@reduxjs/toolkit';
import userReducer from './stores/user/userSlice'
import blogReducer from './stores/blog/blogSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
