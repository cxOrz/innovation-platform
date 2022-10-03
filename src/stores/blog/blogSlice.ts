import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogType } from "../../configs/types";
import { RootState } from '../../store'

interface BlogSlice {
  data: BlogType
}
export const initialBlogState: BlogSlice = {
  data: {
    _id: '',
    openid: '',
    title: '',
    author: '',
    description: '',
    avatarUrl: '',
    markdown: '',
    tag: [""],
    date: new Date()
  }
}

export const blogSlice = createSlice({
  name: 'blog',
  initialState: initialBlogState,
  reducers: {
    updateBlog: (state: BlogSlice, action: PayloadAction<BlogType>) => {
      state.data = action.payload
    },
    resetBlog: (state: BlogSlice) => {
      state.data = initialBlogState.data
    }
  }
})

export const { updateBlog, resetBlog } = blogSlice.actions

export const selectBlog = (state: RootState) => state.blog

export default blogSlice.reducer