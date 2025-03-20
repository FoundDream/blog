import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Ziwen's Blog",
  description: "A wonderful blog",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '笔记', link: '/algorithm/binaryTree' }
    ],

    sidebar: [
      {
        text: '代码随想录 (JS)',
        items: [
          { text: '二叉树', link: '/algorithm/binaryTree' },      
        ]
      },
    ],

    outline: {
      level: [2, 3],
      label: '页面导航',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/FoundDream' }
    ]
  }
})
