import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Blog } from "../../pages/Blog/Blog";
import { RootState } from '../../store'

interface BlogSlice {
  data: Blog
}
const initialState: BlogSlice = {
  data: {
    author_description: '',
    author_gh: '',
    date: 0,
    markdown: '',
    tag: [],
    title: '',
    _id: '',
    _openid: ''
  }
}

export const blogSlice = createSlice({
  name: 'blog',
  initialState: initialState,
  reducers: {
    updateBlog: (state: BlogSlice, action: PayloadAction<Blog>) => {
      state.data = action.payload
    },
  }
})

export const { updateBlog } = blogSlice.actions

export const selectBlog = (state: RootState) => state.blog

export default blogSlice.reducer