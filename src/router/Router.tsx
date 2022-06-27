import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from '../App'
import AppDetail from '../pages/AppDetail/AppDetail'
import Applications from '../pages/Applications/Applications'
import ApplyApp from '../pages/ApplyApp/ApplyApp'
import Blog from '../pages/Blog/Blog'
import Home from '../pages/Home/Home'
import Members from '../pages/Members/Members'
import User from '../pages/User/User'
import UserProfile from '../components/UserProfile/UserProfile'
import JoinUs from '../components/JoinUs/JoinUs'
import BlogWriting from '../pages/BlogWriting/BlogWriting'
import BlogFull from '../components/BlogFull/BlogFull'
import BlogPage from '../components/BlogPage/BlogPage'
import OrderSupport from '../components/OrderSupport/OrderSupport'
import OrderManage from '../pages/OrderManage/OrderManage'

const AppRouter = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter >
  )
}

export default AppRouter