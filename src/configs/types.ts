export interface User {
  uid: string;
  phone: string;
  avatarUrl: string;
  nickName: string;
  email: string;
  openid: string;
  role: number;
  token: string;
}

export interface BlogType {
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

export type Message = {
  data: string;
  direction: number;
}

export type OrderStatus = '尚未受理' | '受理中' | '已解决' | '已关闭'

export interface Order {
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