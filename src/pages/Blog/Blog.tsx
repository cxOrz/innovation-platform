import React, { useEffect, useState } from 'react'
import { tcb_db } from '../../configs/global'
import styles from './Blog.module.css'
import 'github-markdown-css/github-markdown-light.css'
import { Link, useParams } from 'react-router-dom'
import hljs from 'highlight.js'
import 'highlight.js/styles/idea.css'
import BlogPreview from '../../components/BlogPreview/BlogPreview'

interface Props { }

export interface Blog {
  author_description: string
  author_gh: string
  date: Date
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

const Blog = (props: Props) => {
  const params = useParams()
  const [markdown, setMarkdown] = useState('')
  const [recent, setRecent] = useState<RecentBlog[]>([])
  const [blogs, setBlogs] = useState<Blog[]>([])

  function fetchBlog() {
    tcb_db.collection('inno-blog').where({})
      .skip(params.page ? Number(params.page) * 5 : 0).limit(5)
      .get().then((res) => {
        console.log(res.data)
        setBlogs(res.data)
      })
  }

  function fetchRecent() {
    tcb_db.collection('inno-blog').limit(5)
      .field({ title: true })
      .get().then((res) => {
        console.log(res.data)
        setRecent(res.data)
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
                return (<li key={e._id}><Link to=''>{e.title}</Link></li>)
              })
            }
          </ul>
        </nav>
      </aside>
      <div className={styles.preview_section}>
        {
          blogs.map((e) => {
            return <BlogPreview key={e._id} blog={e} />
          })
        }
      </div>
      {/* <ReactMarkdown className={styles.markdown_body + ' markdown-body'} children={markdown} remarkPlugins={[remarkGfm]} /> */}
    </div>
  )
}

export default Blog