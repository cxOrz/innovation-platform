import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import React, { useEffect, useRef } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { selectBlog } from '../../stores/blog/blogSlice'
import styles from './BlogToolBar.module.css'

interface Props {
  submit: (title: string, author_gh: string, author_description: string, tag: string[], markdown: string) => void
  markdown: string
}
interface InputRefs {
  title: HTMLInputElement | null,
  tag: HTMLInputElement | null,
  gh_username: HTMLInputElement | null,
  description: HTMLInputElement | null
}

/**
 * 博客撰写页面工具栏，填写博客信息，提交。
 * @param submit 回调函数，用于提交或更新博客
 */
const BlogToolBar = ({ submit, markdown }: Props) => {
  const blog = useAppSelector(selectBlog).data
  const refs = useRef<InputRefs>({
    title: null,
    tag: null,
    gh_username: null,
    description: null
  })

  useEffect(() => {
    // 修改则填充信息栏
    if (window.location.search === '?edit=true') {
      refs.current.title!.value = blog.title
      refs.current.tag!.value = blog.tag.join(' ')
      refs.current.gh_username!.value = blog.author
      refs.current.description!.value = blog.description
    }
  }, [])

  return (
    <div className={styles.toolbar}>
      <TextField inputRef={ref => refs.current.title = ref} sx={{ flex: '5 1 0' }} label="标题" size='small' variant="filled" />
      <TextField inputRef={ref => refs.current.tag = ref} sx={{ flex: '4 1 0' }} label="标签(空格分开)" size='small' variant="filled" />
      <TextField inputRef={ref => refs.current.gh_username = ref} sx={{ flex: '3 1 0' }} label="Github用户名" size='small' variant="filled" />
      <TextField inputRef={ref => refs.current.description = ref} sx={{ flex: '3 1 0' }} label="一条签名(可空)" size='small' variant="filled" />
      <Button variant='contained' onClick={() => {
        submit(refs.current.title!.value, refs.current.gh_username!.value,
          refs.current.description!.value, refs.current.tag!.value.split(' '),
          markdown)
      }} disableElevation>发布文章</Button>
    </div>
  )
}

export default BlogToolBar