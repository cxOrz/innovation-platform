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

export interface Order {
  _id: string
  from_uid: string
  last_date: number
  message: string
  open_date: number
  status: string
  title: string
  to_uid: string
  no: number
}