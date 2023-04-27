/// <reference types="react-scripts" />

interface User {
  uid: string;
  phone: string;
  avatarUrl: string;
  nickName: string;
  email: string;
  openid: string;
  role: number;
  token: string;
}

interface BlogType {
  _id: string;
  openid: string;
  title: string;
  avatarUrl: string;
  author: string;
  description: string;
  markdown: string;
  tag: string[];
  date: Date;
}

type Message = {
  data: string;
  direction: number;
}

type OrderStatus = '尚未受理' | '受理中' | '已解决' | '已关闭'

interface Order {
  _id: string;
  openid: string;
  to_uid: string;
  title: string;
  message: Message[];
  count: number;
  status: OrderStatus;
  last_time: Date;
  open_date: Date;
}

interface Application {
  name: string;
  gendor: string;
  phone: string;
  academy: string;
  major: string;
  idNo: string;
  honors: string;
  self_eval: string;
  comments: string;
}