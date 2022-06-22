import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import hljs from 'highlight.js'
import 'highlight.js/styles/idea.css'
import styles from './BlogFull.module.css'
import { useParams } from 'react-router-dom'
import Tag from '../Tag/Tag'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { selectBlog, updateBlog } from '../../stores/blog/blogSlice'
import { tcb_db } from '../../configs/global'

const BlogFull = () => {
  const blog = useAppSelector(selectBlog).data
  const dispatch = useAppDispatch()
  const params = useParams()
  const date = new Date(blog.date)

  function fetchBlog() {
    tcb_db.collection('inno-blog')
      .doc(params.id as string).get().then((res) => {
        const temp = res.data[0]
        temp.markdown = temp.markdown.replace('<!--truncate-->', '')
        dispatch(updateBlog(temp))
      })
  }

  useEffect(() => {
    if (blog._id !== params.id) fetchBlog()
    setTimeout(() => {
      document.querySelectorAll('pre code').forEach((el: any) => {
        hljs.highlightElement(el)
        el.style.padding = 0
      })
    }, 200)
  }, [params.id])

  return (
    <div className={styles.preview}>
      <h1>{blog.title}</h1>
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
      <ReactMarkdown className={styles.markdown_body + ' markdown-body'} children={blog.markdown} remarkPlugins={[remarkGfm]} />
      <div className={styles.article_footer}>
        <div>
          {blog.tag[0] !== '' &&
            <>
              <strong>标签：</strong>
              {
                blog.tag.map((t, i) => {
                  return <Tag key={i} to=''>{t}</Tag>
                })
              }
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default BlogFull