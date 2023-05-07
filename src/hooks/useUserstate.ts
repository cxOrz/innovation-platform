import { useEffect, useState } from 'react';

const useUserState = () => {
  const [userState, setUserState] = useState<User | null>(null);

  function updateUserState(user: User) {
    setUserState(user);
    localStorage.setItem('uid', user.uid);
    localStorage.setItem('avatarUrl', user.avatarUrl);
    localStorage.setItem('role', String(user.role));
    localStorage.setItem('token', user.token);
  }

  useEffect(() => {
    const userObj: any = {}
    userObj.uid = localStorage.getItem('uid');
    userObj.avatarUrl = localStorage.getItem('avatarUrl');
    userObj.role = Number(localStorage.getItem('role'));
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