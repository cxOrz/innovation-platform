import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
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

const Blog = (props: Props) => {
  const params = useParams()
  const [markdown, setMarkdown] = useState('')
  const [blogs, setBlogs] = useState<Blog[]>([])

  function fetchBlog() {
    tcb_db.collection('inno-blog').where({})
      .skip(params.page ? Number(params.page) * 5 : 0).limit(5)
      .get().then((res) => {
        console.log(res.data)
        setBlogs(res.data)
      })
  }

  useEffect(() => {
    hljs.configure({
      ignoreUnescapedHTML: true
    })
    fetchBlog()
  }, [])

  return (
    <div className={styles.blog_content}>
      <aside className={styles.sidebar}>
        <h3 style={{ marginTop: 0, fontSize: '1.25rem' }}>近期博文</h3>
        <nav>
          <ul>
            <li><Link to=''>React 如何不生成 sourceMap 文件啊</Link></li>
            <li><Link to=''>使用 Webp 减少流量消耗</Link></li>
            <li><Link to=''>Git 基本使用教程</Link></li>
            <li><Link to=''>Innovation 门户系统</Link></li>
            <li><Link to=''>C 语言学生成绩管理系统</Link></li>
          </ul>
        </nav>
      </aside>
      <div>
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