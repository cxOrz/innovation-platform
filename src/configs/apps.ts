export interface Application {
  title: string
  note: string
  description: string
  picture: string
  url: string
  category: Category
}
type Category = '基地应用' | '平台工具' | '其他分类'

export const apps: Application[] = [
  {
    title: '应用提交',
    note: '将你开发的应用提交至此',
    description: '你可以提交你开发的应用，审核过后会添加到应用页面，供大家使用。',
    picture: 'apply-my-app.webp',
    url: '',
    category: '平台工具'
  }
]