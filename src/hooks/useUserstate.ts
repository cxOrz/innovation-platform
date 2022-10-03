import React, { useEffect, useState } from 'react'
import { User } from '../configs/types';

const useUserState = () => {
  const [userState, setUserState] = useState<User | null>(null);

  function updateUserState(user: User) {
    setUserState(user);
    localStorage.setItem('uid', user.uid);
    localStorage.setItem('phone', user.phone);
    localStorage.setItem('avatarUrl', user.avatarUrl);
    localStorage.setItem('nickName', user.nickName);
    localStorage.setItem('email', user.email);
    localStorage.setItem('openid', user.openid);
    localStorage.setItem('role', String(user.role));
    localStorage.setItem('token', user.token);
  }

  useEffect(() => {
    const userObj: any = {}
    userObj.uid = localStorage.getItem('uid');
    userObj.phone = localStorage.getItem('phone');
    userObj.avatarUrl = localStorage.getItem('avatarUrl');
    userObj.nickName = localStorage.getItem('nickName');
    userObj.email = localStorage.getItem('email');
    userObj.openid = localStorage.getItem('openid');
    userObj.role = localStorage.getItem('role');
    userObj.token = localStorage.getItem('token');

    if (userObj.token) {
      setUserState(userObj);
    } else {
      setUserState(null);
    }
  }, []);

  return [userState, updateUserState] as const;

};

export default useUserState;