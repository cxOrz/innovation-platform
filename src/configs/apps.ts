export interface Application {
  title: string;
  note: string;
  description: string;
  picture: string;
  url: string;
  category: Category;
}

export interface Applications {
  base: Application[];
  frontend: Application[];
  backend: Application[];
  tools: Application[];
  learn: Application[];
  others: Application[];
}

export type Category = 'base' | 'frontend' | 'backend' | 'tools' | 'learn' | 'others';

/**
 * 在这里填写你的应用信息，请在你应用对应分类数组的末尾新增，例如添加一个基地应用，则在 base 数组末尾，填写一个信息对象。
 * 图标请存放在 public\assets\app\logos 目录下， picture 属性填写图标文件名称。
 * 请勿修改其他内容！注意代码格式！
 */
export const apps: Applications = {
  base: [
    {
      title: '人员管理',
      note: '管理用户信息',
      description: '调整用户权限、修改用户信息。',
      picture: 'personnel-manage.webp',
      url: `/apps/personnel-manage`,
      category: 'base'
    },
    {
      title: '撰写博文',
      note: '写一篇博客',
      description: '将博客添加到博客页面，供所有人阅览。',
      picture: 'write-blog.webp',
      url: `/apps/blog-write`,
      category: 'base'
    },
    {
      title: '设备管理',
      note: '管理实验室设备',
      description: '台式电脑、固态硬盘、移动开发箱、内存条等，任何购置的实验室资产、设备，都在这里统计。',
      picture: 'device-manage.webp',
      url: `/apps/device-manage`,
      category: 'base'
    },
    {
      title: '反馈管理',
      note: '处理分配到的反馈',
      description: '用户分派给你的工单（反馈），在这里进行处理。',
      picture: 'order-manage.webp',
      url: `/apps/order-manage`,
      category: 'base'
    },
    {
      title: '招新管理',
      note: '管理员及时同步流程状态',
      description: '对用户提交的申请进行处理，可对每一阶段添加评价、打分，要及时修改流程状态，反馈给用户。',
      picture: 'join-us-manage.webp',
      url: `/apps/join-us-management`,
      category: 'base'
    },
    {
      title: '考勤大屏',
      note: '提供考勤和展示功能',
      description: '大屏排序展示所有成员考勤情况；点击卡片进行签到，再次点击签退；设置PIN进行验证；管理员可切换大屏模式为只读或读写；',
      picture: 'attendance.webp',
      url: `/apps/attendance`,
      category: 'base'
    },
    {
      title: '成员招新',
      note: '快来加入我们吧',
      description: '在每年的各种比赛中，披荆斩棘，力争第一。我们不断磨炼自己，勤奋学习，寻找机会磨炼自己，我们历经坎坷，遇到过低谷，也到达过高峰，经过一代代的传承接力，每个人都拥有了更加充足的资源，收获更多的知识与经历。',
      picture: 'join-us.webp',
      url: `/apps/join-us`,
      category: 'base'
    },
  ],
  frontend: [
    {
      title: 'Dribbble',
      note: '发现最棒的设计灵感',
      description: 'Dribbble 是一个面向设计师和创意人员的自我展现和社交平台。它是一个设计作品集平台、工作和招聘网站，是设计师在线分享作品的最大平台之一。它的公司为分布式公司，没有总部，所有员工都是在远程办公。',
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
      description: 'Generator, Maker and Background. 你可以在这里通过简单的点击和拖拽，生成绚丽的渐变 CSS 代码。',
      picture: 'cssgradient.png',
      url: 'https://cssgradient.io',
      category: 'tools'
    },
    {
      title: 'React TS 速查',
      note: 'TS 在 React 中的用法',
      description: `为有 React 开发经验的开发者，提供速查手册，从 JavaScript 迅速过渡到使用 TypeScript 进行开发。`,
      picture: 'tsreact.webp',
      url: 'https://react-typescript-cheatsheet.netlify.app/docs/basic/setup',
      category: 'tools'
    },
    {
      title: 'TypeScript 速查',
      note: 'TS 官方速查手册',
      description: `TypeScript 官方速查文档，涵盖大部分知识点的使用方法。`,
      picture: 'tscheatsheet.webp',
      url: 'https://www.typescriptlang.org/zh/cheatsheets',
      category: 'tools'
    },
    {
      title: 'MDN',
      note: 'Mozilla Web 开发文档',
      description: `著名的 MDN 文档，每一个前端开发者都离不开的网站。你可以在这里浏览 HTML、CSS、JavaScript 的文档，也可以在这里直接跟着教程学习。`,
      picture: 'mdn.webp',
      url: 'https://developer.mozilla.org/zh-CN/docs/Learn',
      category: 'learn'
    },
    {
      title: 'React 中文官网',
      note: '构建 UI 的 JavaScript 框架',
      description: `用于构建用户界面的 JavaScript 库，比 Vue 生态更大，在大中型项目用得更多。`,
      picture: 'react.webp',
      url: 'https://zh-hans.reactjs.org',
      category: 'learn'
    },
    {
      title: 'Vue 中文官网',
      note: '渐进式 JavaScript 框架',
      description: `渐进式 JavaScript 框架，一款用于构建 Web 界面，易学易用，性能出色且功能丰富的框架。适合中小型项目，特别适合“独狼”开发者，上手快，效率高。`,
      picture: 'vue.webp',
      url: 'https://staging-cn.vuejs.org',
      category: 'learn'
    },
  ],
  backend: [
  ],
  tools: [
    {
      title: 'Vercel',
      note: '自动构建部署静态网站',
      description: 'Vercel combines the best developer experience with an obsessive focus on end-user performance.',
      picture: 'vercel.webp',
      url: 'https://vercel.com',
      category: 'tools'
    },
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
      description: `在这里可以构建、测试、调试正则表达式，可视化的匹配结果和过程，让你产生更清晰的认识。`,
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
      description: `学的不仅是技术，更是梦想！菜鸟教程提供了基础编程技术教程，此站致力于推广各种编程语言技术，所有资源是完全免费的，并且会根据当前互联网的变化实时更新此站内容。
      同时此站内容如果有不足的地方，也欢迎广大编程爱好者在该站留言提供意见。`,
      picture: 'runoob.webp',
      url: 'https://www.runoob.com',
      category: 'learn'
    },
    {
      title: 'roadmap.sh',
      note: '各类开发技术路线图',
      description: `roadmap.sh is a community effort to create roadmaps, guides and other educational content to help guide the developers in picking up the path and guide their learnings.`,
      picture: 'roadmap.webp',
      url: 'https://roadmap.sh',
      category: 'tools'
    },
  ],
  others: []
};
