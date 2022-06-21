import React, { useCallback, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import BlogToolBar from '../../components/BlogToolBar/BlogToolBar'
import { tcb_db } from '../../configs/global'
import styles from './BlogWriting.module.css'

interface Props { }

const BlogWriting = (props: Props) => {
  const [markdown, setMarkdown] = useState('')

  function submit() {
    tcb_db.collection('inno-blog').add({
      title: 'React 测试文档',
      author_gh: 'cxOrz',
      author_discription: 'An unknown student',
      tag: ['技术'],
      date: new Date(),
      markdown: ''
    }).then((res) => {
      console.log(res)
    })
  }
  function fetchBlog() {
    tcb_db.collection('inno-blog').where({}).get().then((res) => {
      console.log(res.data)
    })
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
  }, [])

  return (
    <div className={styles.container}>
      <BlogToolBar />
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