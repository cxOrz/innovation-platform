import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from '../App'
import GlobalLoader from '../components/GlobalLoader/GlobalLoader'

// 懒加载，拆分代码
const Home = lazy(() => import('../pages/Home/Home'))
const Applications = lazy(() => import('../pages/Applications/Applications'))
const ApplyApp = lazy(() => import('../pages/ApplyApp/ApplyApp'))
const AppDetail = lazy(() => import('../pages/AppDetail/AppDetail'))
const Blog = lazy(() => import('../pages/Blog/Blog'))
const BlogPage = lazy(() => import('../components/BlogPage/BlogPage'))
const BlogFull = lazy(() => import('../components/BlogFull/BlogFull'))
const BlogWriting = lazy(() => import('../pages/BlogWriting/BlogWriting'))
const Members = lazy(() => import('../pages/Members/Members'))
const User = lazy(() => import('../pages/User/User'))
const JoinUs = lazy(() => import('../components/JoinUs/JoinUs'))
const UserProfile = lazy(() => import('../components/UserProfile/UserProfile'))
const OrderSupport = lazy(() => import('../components/OrderSupport/OrderSupport'))
const OrderManage = lazy(() => import('../pages/OrderManage/OrderManage'))

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<GlobalLoader loading />}>
        <Routes>
          <Route path='/' element={<App />} >
            <Route path='/' element={<Home />} />
            <Route path='apps' element={<Applications />} />
            <Route path='apps/apply-app' element={<ApplyApp />} />
            <Route path='apps/:category/:id' element={<AppDetail />} />
            <Route path='blog' element={<Blog />} >
              <Route path='page/:page' element={<BlogPage />} />
              <Route path=':id' element={<BlogFull />} />
            </Route>
            <Route path='blog-write' element={<BlogWriting />} />
            <Route path='members' element={<Members />} />
            <Route path='order-manage' element={<OrderManage />} />
            <Route path='user' element={<User />} >
              <Route path='profile' element={<UserProfile />} />
              <Route path='support' element={<OrderSupport />} />
              <Route path='join-us' element={<JoinUs />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter >
  )
}

export default AppRouter