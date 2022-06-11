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

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} >
          <Route path='/' element={<Home />} />
          <Route path='apps' element={<Applications />} />
          <Route path='apps/apply-app' element={<ApplyApp />} />
          <Route path='apps/:category/:id' element={<AppDetail />} />
          <Route path='blog' element={<Blog />} />
          <Route path='members' element={<Members />} />
          <Route path='user' element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default AppRouter