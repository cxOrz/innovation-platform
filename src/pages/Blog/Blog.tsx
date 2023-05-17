import DoubleLeftArrowIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import DoubleRightArrowIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { blog_list_ } from '../../configs/api';
import { hljs } from '../../configs/global';
import styles from './Blog.module.css';

interface RecentBlog {
  title: string;
  _id: string;
}

/**
 * 博客功能页面，左侧菜单栏，右侧内容区域
 * 
 * 功能：获取近期5条博文标题，放在左侧菜单栏；根据页号获取5条博客，在右侧区域进行简短的预览
 */
const Blog = () => {
  const params = useParams();
  const [recent, setRecent] = useState<RecentBlog[]>([]);

  // 博客近期列表
  function fetchRecent() {
    axios.get(blog_list_).then((res) => {
      setRecent(res.data.data);
    });
  }

  useEffect(() => {
    hljs.configure({
      ignoreUnescapedHTML: true
    });
    fetchRecent();
  }, []);

  return (
    <div className={styles.main}>
      <aside className={styles.sidebar}>
        <h3 style={{ marginTop: 0, fontSize: '1.25rem' }}>近期博文</h3>
        <nav>
          <ul>
            {
              recent.slice(0, 5).map((e) => {
                return (<li key={e._id}><Link to={`/blog/${e._id}`}>{e.title}</Link></li>);
              })
            }
          </ul>
        </nav>
      </aside>
      <main className={styles.content}>
        <Outlet />
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
  );
};

export default Blog;