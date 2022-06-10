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
    title: 'Neumorphism.io',
    note: '生成拟态CSS效果代码',
    description: 'Generate Soft-UI CSS code',
    picture: 'neumorphism.io.webp',
    url: 'https://neumorphism.io',
    category: '平台工具'
  }
]