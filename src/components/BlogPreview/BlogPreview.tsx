import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import hljs from 'highlight.js'
import 'highlight.js/styles/idea.css'
import styles from './BlogPreview.module.css'
import type { Blog } from '../../pages/Blog/Blog'

interface Props {
  blog: Blog
}

const BlogPreview = ({ blog }: Props) => {
  const [preview, setPreview] = useState('')

  useEffect(() => {
    setPreview(blog.markdown.split('<!--truncate-->')[0])
    setTimeout(() => {
      document.querySelectorAll('pre code').forEach((el: any) => {
        hljs.highlightElement(el)
        el.style.padding = 0
      })
    }, 0)
  }, [])

  return (
    <div>
      <h2>{blog.tag}</h2>
      <ReactMarkdown className={styles.markdown_body + ' markdown-body'} children={preview} remarkPlugins={[remarkGfm]} />
    </div>
  )
}

export default BlogPreview