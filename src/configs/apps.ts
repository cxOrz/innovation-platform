export interface Application {
  title: string
  note: string
  description: string
  picture: string
  url: string
  category: Category
}

export interface Applications {
  base: Application[]
  frontend: Application[]
  backend: Application[]
  tools: Application[]
  learn: Application[]
  others: Application[]
}

export type Category = 'base' | 'frontend' | 'backend' | 'tools' | 'learn' | 'others'

export const apps: Applications = {
  base: [],
  frontend: [
    {
      title: 'Dribbble',
      note: '发掘最棒的设计灵感',
      description: 'Generate Soft-UI CSS code',
      picture: 'dribbble.svg',
      url: 'https://dribbble.com',
      category: 'tools'
    },
    {
      title: 'Neumorphism.io',
      note: '生成拟态 CSS 效果代码',
      description: 'Generate Soft-UI CSS code',
      picture: 'neumorphism.io.webp',
      url: 'https://neumorphism.io',
      category: 'tools'
    },
    {
      title: 'CSS Gradient',
      note: '渐变效果代码生成',
      description: 'Generate Soft-UI CSS code',
      picture: 'cssgradient.png',
      url: 'https://cssgradient.io',
      category: 'tools'
    },
    {
      title: 'React TS 速查',
      note: 'TS 在 React 中的用法',
      description: `Cheatsheets for experienced React developers getting started with TypeScript`,
      picture: 'tsreact.webp',
      url: 'https://react-typescript-cheatsheet.netlify.app/docs/basic/setup',
      category: 'tools'
    },
    {
      title: 'TypeScript 速查',
      note: 'TS 在 React 中的用法',
      description: `Cheatsheets for experienced React developers getting started with TypeScript`,
      picture: 'tscheatsheet.webp',
      url: 'https://www.typescriptlang.org/zh/cheatsheets',
      category: 'tools'
    },
    {
      title: 'MDN',
      note: 'Mozilla Web 开发文档',
      description: `学的不仅是技术，更是梦想！`,
      picture: 'mdn.webp',
      url: 'https://developer.mozilla.org/zh-CN/docs/Learn',
      category: 'learn'
    },
    {
      title: 'React 中文官网',
      note: '构建 UI 的 JavaScript 框架',
      description: `构建用户界面的 JavaScript 框架`,
      picture: 'react.webp',
      url: 'https://zh-hans.reactjs.org',
      category: 'learn'
    },
    {
      title: 'Vue 中文官网',
      note: '渐进式 JavaScript 框架',
      description: `渐进式 JavaScript 框架`,
      picture: 'vue.webp',
      url: 'https://staging-cn.vuejs.org',
      category: 'learn'
    },
  ],
  backend: [
  ],
  tools: [
    {
      title: 'Carbon',
      note: '生成你提供代码的截图',
      description: 'Create and share beautiful images of your source code. Start typing or drop a file into the text area to get started.',
      picture: 'carbon.webp',
      url: 'https://carbon.now.sh',
      category: 'tools'
    },
    {
      title: 'regex101',
      note: '构建测试调试正则表达式',
      description: `Cheatsheets for experienced React developers getting started with TypeScript`,
      picture: 'regex101.webp',
      url: 'https://regex101.com',
      category: 'tools'
    },
  ],
  learn: [
    {
      title: 'Learn Git',
      note: 'Git 图形化学习教程',
      description: `你对 Git 感兴趣吗？那么算是来对地方了！ 
      “Learning Git Branching” 可以说是目前为止最好的教程了，在沙盒里你能执行相应的命令，还能看到每个命令的执行情况； 
      通过一系列刺激的关卡挑战，逐步深入的学习 Git 的强大功能，在这个过程中你可能还会发现一些有意思的事情。`,
      picture: 'learngit.webp',
      url: 'https://learngitbranching.js.org/?locale=zh_CN',
      category: 'learn'
    },
    {
      title: '菜鸟教程',
      note: '各种技术入门学习网站',
      description: `学的不仅是技术，更是梦想！`,
      picture: 'runoob.webp',
      url: 'https://www.runoob.com',
      category: 'learn'
    },
    {
      title: 'roadmap.sh',
      note: '各类开发技术路线图',
      description: `Cheatsheets for experienced React developers getting started with TypeScript`,
      picture: 'roadmap.webp',
      url: 'https://roadmap.sh',
      category: 'tools'
    },
  ],
  others: []
}
