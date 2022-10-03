import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import BlogToolBar from '../../components/BlogToolBar/BlogToolBar'
import { blog_create, blog_update } from '../../configs/api'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import useUserState from '../../hooks/useUserstate'
import { selectBlog } from '../../stores/blog/blogSlice'
import { updateSnackBar } from '../../stores/snackbar/snackbarSlice'
import styles from './BlogWriting.module.css'

/**
 * 博客撰写、更新页面
 */
const BlogWriting = () => {
  const params = new URLSearchParams(window.location.search)
  const [markdown, setMarkdown] = useState('')
  const [textArea, setTextArea] = useState('')
  const blog = useAppSelector(selectBlog)
  const dispatch = useAppDispatch()
  const [userState] = useUserState()

  function submit(title: string, author: string, description: string, tag: string[], markdown: string) {
    // 字段判断
    if (title !== '' && author !== '' && markdown !== '') {
      if (params.get('edit') === 'true') {
        // 修改博客
        axios.post(blog_update, {
          _id: blog.data._id,
          title: title,
          author: author,
          description: description,
          tag: tag,
          markdown: markdown
        }, { headers: { 'Authorization': userState?.token ? userState?.token : "" } }).then(() => {
          dispatch(updateSnackBar({ open: true, severity: 'success', message: '修改成功，即将跳转！' }));
          setTimeout(() => {
            window.open(`/blog/${blog.data._id}`, '_self');
          }, 2000);
        });
      } else {
        // 新增博客
        axios.post(blog_create, {
          title: title,
          author: author,
          description: description,
          tag: tag,
          markdown: markdown
        }, { headers: { 'Authorization': userState?.token ? userState?.token : "" } }).then((res) => {
          if (res.data.code === 401) {
            dispatch(updateSnackBar({ open: true, severity: 'error', message: '无权进行发布！' }));
          } else {
            dispatch(updateSnackBar({ open: true, severity: 'success', message: '发布成功，即将跳转！' }));
            setTimeout(() => {
              window.open('/blog/page/1', '_self')
            }, 2000);
          }
        });
      }
    } else {
      // 错误提示
      dispatch(updateSnackBar({ open: true, severity: 'warning', message: '至少标题、用户名、内容不能为空！' }));
    }
  }

  function handleInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setMarkdown(event.target.value)
  }

  const debouncedFun = debounce(handleInput, 500)
  const DebounceHandler = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextArea(e.target.value)
    debouncedFun(e)
  }, [])

  function debounce(fn: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, delay: number) {
    let timer: any
    return function (param: React.ChangeEvent<HTMLTextAreaElement>) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(fn, delay, param)
    }
  }

  useEffect(() => {
    // 修改则填充内容，否则设为空
    if (params.get('edit') === 'true') {
      setMarkdown(blog.data.markdown)
      setTextArea(blog.data.markdown)
    } else {
      setMarkdown('')
    }
  }, [])

  return (
    <div className={styles.container}>
      <BlogToolBar markdown={markdown} submit={submit} />
      <div className={styles.content}>
        <div className={styles.left}>
          <textarea autoFocus onChange={DebounceHandler} value={textArea} />
        </div>
        <div className={styles.spliter}></div>
        <div className={styles.right + ' markdown-body ' + styles.markdown_body}>
          <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
        </div>
      </div>
    </div>
  )
}

export default BlogWriting