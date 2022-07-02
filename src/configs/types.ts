export interface TCBUser {
  uid?: string,
  phone?: string,
  avatarUrl?: string,
  nickName?: string,
  hasPassword?: boolean,
  customUserId?: string,
  email?: string,
  gender?: string,
  location?: { country?: string, province?: string, city?: string },
  loginType?: 'PHONE' | 'WECHAT' | 'ANONYMOUS' | 'CUSTOM',
  openid?: string,
  qqMiniOpenId?: string,
  unionId?: string,
  username?: string,
  wxOpenId?: string,
  wxPublicId?: string,
  role?: number
}

export interface BlogType {
  author_description: string
  author_gh: string
  date: number
  markdown: string
  tag: string[]
  title: string
  _id: string
  _openid: string
}

export type Message = {
  data: string
  direction: number
}

export type OrderStatus = '尚未受理' | '受理中' | '已解决' | '已关闭'

export interface Order {
  _id: string
  from_uid: string
  last_date: number
  message: Message[]
  open_date: number
  status: OrderStatus
  title: string
  to_uid: string
  id: number
}