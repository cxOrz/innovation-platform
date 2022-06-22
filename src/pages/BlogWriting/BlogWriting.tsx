import React, { useCallback, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import BlogToolBar from '../../components/BlogToolBar/BlogToolBar'
import { tcb_db } from '../../configs/global'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { selectBlog } from '../../stores/blog/blogSlice'
import { updateSnackBar } from '../../stores/snackbar/snackbarSlice'
import styles from './BlogWriting.module.css'

const BlogWriting = () => {
  const params = new URLSearchParams(window.location.search)
  const [markdown, setMarkdown] = useState('')
  const blog = useAppSelector(selectBlog)
  const dispatch = useAppDispatch()

  function submit(title: string, author_gh: string, author_description: string, tag: string[], date: number, markdown: string) {
    if (title !== '' && author_gh !== '' && markdown !== '') {
      tcb_db.collection('inno-blog').add({
        title: title,
        author_gh: author_gh,
        author_description: author_description,
        tag: tag,
        date: date,
        markdown: markdown
      }).then((res) => {
        if (res.code === 'DATABASE_PERMISSION_DENIED') {
          dispatch(updateSnackBar({ open: true, severity: 'error', message: '无权进行发布！' }))
        } else {
          dispatch(updateSnackBar({ open: true, severity: 'success', message: '发布成功，即将跳转！' }))
          window.open('/blog', '_self')
        }
      })
    } else {
      dispatch(updateSnackBar({ open: true, severity: 'warning', message: '至少标题、用户名、内容不能为空！' }))
    }
  }

  function handleInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setMarkdown(event.target.value)
  }

  const DebounceHandler = useCallback(
    debounce(handleInput, 500)
    , [])

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
    } else {
      setMarkdown('')
    }
  }, [])

  return (
    <div className={styles.container}>
      <BlogToolBar markdown={markdown} submit={submit} />
      <div className={styles.content}>
        <div className={styles.left}>
          <textarea autoFocus onChange={DebounceHandler} />
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