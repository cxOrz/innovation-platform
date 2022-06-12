export interface Member {
  name: string
  description: string
  github: string
  githubUserName: string
  blog?: string
  twitter?: string
  bilibili?: string
}

/**
 * 在这个数组中填写你的信息，请从末尾添加。注意代码格式，请勿改动他人信息。
 * blog，twitter，bilibili 为可选内容，其他是必填字段。
 */
export const members: Member[] = [
  {
    name: 'cxOrz',
    description: '一杯茶，一根网线，一台电脑',
    github: 'https://github.com/cxOrz',
    githubUserName: 'cxOrz',
    blog: 'https://meoo.space',
    twitter: 'https://twitter.com',
    bilibili: 'https://space.bilibili.com/18844857'
  },
  {
    name: 'Gezi',
    description: '搞点有意思的玩意才有意思',
    github: 'https://github.com/Gezi-lzq',
    githubUserName: 'Gezi-lzq',
    blog: 'https://gezi-lzq.github.io/wiki',
    bilibili: 'https://space.bilibili.com/153258889',
  },
  {
    name: '楚西文',
    description: '积极向上的菜鸡',
    github: 'https://github.com/chuxiwen-forever',
    githubUserName: 'chuxiwen-forever',
    blog: 'https://www.chuxiwen.top'
  },
  {
    name: 'Thousand_Star',
    description: 'Under the starry sky.',
    github: 'https://github.com/QianChenJun',
    githubUserName: 'QianChenJun',
    blog: 'https://www.qianchen.xyz',
  },
  {
    name: '胥天昊',
    description: '头发多多',
    github: 'https://github.com/Xiaobaicai350',
    githubUserName: 'Xiaobaicai350',
  }
]
