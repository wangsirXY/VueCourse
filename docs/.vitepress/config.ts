export default {
  lang: 'en-US',
  title: 'GuAn学习日记',
  description: 'Vue技术文档',
  base: "/VueCourse",
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    docsDir: 'docs',

    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新',

    // custom containers
    tip: '提示',
    warning: '注意',
    danger: '警告',
    info: "引用",

    // 404 page
    notFound: [
      '这里什么都没有',
      '我们怎么到这来了？',
      '这是一个 404 页面',
      '看起来我们进入了错误的链接',
    ],
    backToHome: '返回首页',

    algolia: {
      apiKey: 'c57105e511faa5558547599f120ceeba',
      indexName: 'vitepress'
    },
    nav: [
      { text: 'Guide', link: '/', activeMatch: '^/$|^/guide/' },
      {
        text: '主页',
        link: 'http://wangsir.info/',
        activeMatch: '^/config/',
      },
      {
        text: '我的技术栈',
        activeMatch: '^/config/',
        items: [
          {
            text: 'Html & CSS',
            link: 'https://wangsirxy.github.io/HtmlCssCourse/',
            activeMatch: '^/config/',
          },
          {
            text: 'JavaScript',
            link: 'https://wangsirxy.github.io/javaScriptCourse/',
            activeMatch: '^/config/',
          },
          {
            text: 'JavaScript高级',
            link: 'https://wangsirxy.github.io/javaScriptAdvancedCourse/',
            activeMatch: '^/config/',
          },
          {
            text: 'jQuery',
            link: 'https://wangsirxy.github.io/jQueryCourse/',
            activeMatch: '^/config/',
          },
          {
            text: 'Node.js',
            link: 'https://WangSirXY.github.io/nodejsCourse',
            activeMatch: '^/config/',
          },
          {
            text: 'Ajax',
            link: 'https://WangSirXY.github.io/ajaxCourse',
            activeMatch: '^/config/',
          },
          {
            text: 'Git',
            link: 'https://WangSirXY.github.io/gitCourse',
            activeMatch: '^/config/',
          },
          {
            text: '移动Web & Webpack',
            link: 'https://WangSirXY.github.io/mobileWebCourse',
            activeMatch: '^/config/',
          },
          {
            text: 'Vue',
            link: '/documents/vue/vue',
            activeMatch: '^/config/',
          },
        ]
      },
      {
        text: '友情链接',
        activeMatch: '^/config/',
        items: [
          {
            text: 'GuAn',
            link: 'http://wangsir.info/',
            activeMatch: '^/config/',
          },
          {
            text: 'irohane的个人博客',
            link: 'https://www.irohane.top/',
            activeMatch: '^/config/',
          }
        ]
      },
      { text: 'GitHub', link: 'https://github.com/wangsirXY/', activeMatch: '^/$|^/guide/' },
    ],
    sidebar: {
      '/': getGuideSidebar()
    }
  }
}

function getGuideSidebar() {
  return [
    /** 一个对象是一个侧边栏标题
     * text：标题   children：二级菜单栏   link：地址 */
    {
      text: 'Vue',
      activeMatch: '^/config/',
      children: [
        { text: 'Get Started', link: '/documents/vue/vue', }
      ]
    },
    {
      text: 'Vue--Router',
      activeMatch: '^/config/',
      children: [
        { text: 'Get Started', link: '/documents/vue/vueRouter', }
      ]
    },
    {
      text: 'VueX',
      activeMatch: '^/config/',
      children: [
        { text: 'Get Started', link: '/documents/vue/vuex', }
      ]
    },
  ]
}