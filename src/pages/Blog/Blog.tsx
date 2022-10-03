import React, { useEffect, useState } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import { hljs } from '../../configs/global'
import BlogPreview from '../../components/BlogPreview/BlogPreview'
import styles from './Blog.module.css'
import { updateBlog } from '../../stores/blog/blogSlice'
import { useAppDispatch } from '../../hooks/redux'
import { BlogType } from '../../configs/types'
import DoubleRightArrowIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import DoubleLeftArrowIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import axios from 'axios'
import { blog_list_ } from '../../configs/api'

interface RecentBlog {
  title: string
  _id: string
}

/**
 * 博客功能页面，左侧菜单栏，右侧内容区域
 * 
 * 功能：获取近期5条博文标题，放在左侧菜单栏；根据页号获取5条博客，在右侧区域进行简短的预览
 */
const Blog = () => {
  const params = useParams()
  const dispatch = useAppDispatch()
  const [recent, setRecent] = useState<RecentBlog[]>([])
  const [blogs, setBlogs] = useState<BlogType[]>([])

  // 博客近期列表
  function fetchRecent() {
    axios.get(blog_list_).then((res) => {
      setRecent(res.data.data);
    });
  }

  // 近期列表中点击的博客，设置到全局状态
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
    fetchRecent()
  }, [])

  return (
    <div className={styles.main}>
      <aside className={styles.sidebar}>
        <h3 style={{ marginTop: 0, fontSize: '1.25rem' }}>近期博文</h3>
        <nav>
          <ul>
            {
              recent.slice(0, 5).map((e) => {
                return (<li key={e._id}><Link to={`/blog/${e._id}`} onClick={() => { setCurrentBlog(e._id) }}>{e.title}</Link></li>)
              })
            }
          </ul>
        </nav>
      </aside>
      <main className={styles.content}>
        { // 显示指定博客或处于指定页数,则渲染子路由内容;否则渲染首页5篇博客
          params.id || params.page ?
            <Outlet />
            :
            blogs.map((e) => {
              return <BlogPreview key={e._id} blog={e} />
            })
        }
        { // 换页按钮
          window.location.pathname.includes('blog/page') &&
          <nav>
            {
              Number(params?.page) > 1 &&
              <Link
                className={`${styles.switchPage} ${styles.prev}`}
                to={`page/${Number(params.page) - 1}`}
              >
                <DoubleLeftArrowIcon fontSize='small' sx={{ verticalAlign: '-20%' }} />上一页
              </Link>
            }
            {
              Math.floor(recent.length / 5) + 1 !== Number(params.page) &&
              <Link
                className={`${styles.switchPage} ${styles.next}`}
                to={`page/${(Number(params.page) ? Number(params.page) : 1) + 1}`}
              >
                下一页<DoubleRightArrowIcon fontSize='small' sx={{ verticalAlign: '-20%' }} />
              </Link>
            }
          </nav>
        }
      </main>
    </div>
  )
}

export default Blog