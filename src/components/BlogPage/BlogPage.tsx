import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { tcb_db } from '../../configs/global'
import type { BlogType } from '../../pages/Blog/Blog'
import BlogPreview from '../BlogPreview/BlogPreview'

interface Props { }

const BlogPage = (props: Props) => {
  const params = useParams()
  const [blogs, setBlogs] = useState<BlogType[]>([])

  function fetchBlog() {
    tcb_db.collection('inno-blog')
      .skip((Number(params.page) - 1) * 5).limit(5)
      .get().then((res) => {
        console.log(res.data)
        setBlogs(res.data)
      })
  }

  useEffect(() => {
    fetchBlog()
  }, [])

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