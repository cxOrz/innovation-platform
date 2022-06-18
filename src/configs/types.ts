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