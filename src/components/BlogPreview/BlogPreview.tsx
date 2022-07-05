import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { hljs } from '../../configs/global'
import 'highlight.js/styles/idea.css'
import styles from './BlogPreview.module.css'
import type { BlogType } from '../../configs/types'
import { Link } from 'react-router-dom'
import Tag from '../Tag/Tag'
import { useAppDispatch } from '../../hooks/redux'
import { updateBlog } from '../../stores/blog/blogSlice'

interface Props {
  blog: BlogType
}

/**
 * 
 * @param blog 传入博客，进行分割，展示一部分，称之为预览。 
 * @returns 返回的是本预览组件。
 */
const BlogPreview = ({ blog }: Props) => {
  const [preview, setPreview] = useState('')
  const dispatch = useAppDispatch()
  const date = new Date(blog.date)

  // 设置当前博客到redux全局变量，不用再次请求博客
  function setCurrentBlog() {
    dispatch(updateBlog(blog))
  }

  useEffect(() => {
    // 分开文档，一半预览一半隐藏
    const temp = blog.markdown.split('<!--truncate-->')
    setPreview(temp[0])
    setTimeout(() => {
      document.querySelectorAll('pre code').forEach((el: any) => {
        hljs.highlightElement(el)
        el.style.padding = 0
      })
    }, 0)
  }, [])

  return (
    <article className={styles.preview}>
      <h1><Link to={`/blog/${blog._id}`} onClick={setCurrentBlog}>{blog.title}</Link></h1>
      <p className={styles.est}>{date.getFullYear()}年{date.getMonth() + 1}月{date.getDate()}日 · 预计阅读时间 {Math.round(blog.markdown.length / 200)} min</p>
      {
        blog.author_gh !== '' &&
        <div className={styles.author}>
          <a href={`https://github.com/${blog.author_gh}`} target="_blank" rel="noopener noreferrer">
            <img alt='avatar' width='48' height='48' src={`https://avatars.githubusercontent.com/${blog.author_gh}?s=256`} />
          </a>
          <div>
            <a className={styles.avatar_name} href={`https://github.com/${blog.author_gh}`} target="_blank" rel="noopener noreferrer">
              {blog.author_gh}
            </a>
            <small>{blog.author_description}</small>
          </div>
        </div>
      }
      <ReactMarkdown className={styles.markdown_body + ' markdown-body'} children={preview} remarkPlugins={[remarkGfm]} />
      <div className={styles.article_footer}>
        {
          blog.tag[0] !== '' &&
          < div >
            <strong>标签：</strong>
            {
              blog.tag.map((t, i) => {
                return <Tag key={i} to=''>{t}</Tag>
              })
            }
          </div>
        }
        <Link to={`/blog/${blog._id}`} onClick={setCurrentBlog}>阅读全文</Link>
      </div>
    </article >
  )
}

export default BlogPreview