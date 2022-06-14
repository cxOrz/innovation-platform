import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from './Blog.module.css'

interface Props { }

const Blog = (props: Props) => {
  return (
    <div className={styles.blog_content}>
      <ReactMarkdown children={''} remarkPlugins={[remarkGfm]} />
    </div>
  )
}

export default Blog