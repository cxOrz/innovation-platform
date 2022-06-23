import React, { useEffect, useState } from 'react'
import { tcb_db } from '../../configs/global'
import { Link, Outlet, useParams } from 'react-router-dom'
import hljs from 'highlight.js'
import BlogPreview from '../../components/BlogPreview/BlogPreview'
import styles from './Blog.module.css'
import { updateBlog } from '../../stores/blog/blogSlice'
import { useAppDispatch } from '../../hooks/redux'

export interface BlogType {
  author_description: string
  author_gh: string
  date: number
  markdown: string
  tag: string[]
  title: string
  _id: string
  _openid: string
}

interface RecentBlog {
  title: string
  _id: string
}

const Blog = () => {
  const params = useParams()
  const dispatch = useAppDispatch()
  const [recent, setRecent] = useState<RecentBlog[]>([])
  const [blogs, setBlogs] = useState<BlogType[]>([])

  function fetchBlog() {
    tcb_db.collection('inno-blog')
      .limit(5).orderBy('date', 'desc').get().then((res) => {
        setBlogs(res.data)
      })
  }

  function fetchRecent() {
    tcb_db.collection('inno-blog').limit(5)
      .orderBy('date', 'desc').field({ title: true })
      .get().then((res) => {
        setRecent(res.data)
      })
  }

  function setCurrentBlog(id: string) {
    blogs.slice(0, 5).forEach((blog) => {
      if (blog._id === id) {
        dispatch(updateBlog(blog))
      }
    })
  }

  useEffect(() => {
    hljs.configure({
      ignoreUnescapedHTML: true
    })
    fetchBlog()
    fetchRecent()
  }, [])

  return (
    <div className={styles.blog_content}>
      <aside className={styles.sidebar}>
        <h3 style={{ marginTop: 0, fontSize: '1.25rem' }}>近期博文</h3>
        <nav>
          <ul>
            {
              recent.map((e) => {
                return (<li key={e._id}><Link to={`/blog/${e._id}`} onClick={() => { setCurrentBlog(e._id) }}>{e.title}</Link></li>)
              })
            }
          </ul>
        </nav>
      </aside>
      <div className={styles.preview_section}>
        { // 显示指定博客或处于指定页数,则渲染子路由内容;否则渲染首页5篇博客
          params.id || params.page ? <Outlet /> :
            blogs.map((e) => {
              return <BlogPreview key={e._id} blog={e} />
            })
        }
      </div>
    </div>
  )
}

export default Blog