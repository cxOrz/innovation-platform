import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { tcb_db } from '../../configs/global'
import { BlogType } from '../../configs/types'
import BlogPreview from '../BlogPreview/BlogPreview'

/**
 * 博客二级页面，根据路由页码显示对应页内容。嵌在 /blog 页面中。
 */
const BlogPage = () => {
  const params = useParams()
  const [blogs, setBlogs] = useState<BlogType[]>([])

  function fetchBlog() {
    tcb_db.collection('inno-blog')
      .skip((Number(params.page) - 1) * 5)
      .limit(5).orderBy('date', 'desc')
      .get().then((res) => {
        setBlogs(res.data)
      })
  }

  useEffect(() => {
    fetchBlog()
  }, [params.page])

  return (
    <div>
      {
        blogs.map((e) => {
          return <BlogPreview key={e._id} blog={e} />
        })
      }
    </div>
  )
}

export default BlogPage