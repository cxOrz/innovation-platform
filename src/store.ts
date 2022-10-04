import { configureStore } from '@reduxjs/toolkit';
import userReducer from './stores/user/userSlice'
import blogReducer from './stores/blog/blogSlice'
import snackbarReducer from './stores/snackbar/snackbarSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
    snackbar: snackbarReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
