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
        text: '算法/手撕',
        items: [
          { text: '数组', link: '/algorithm/array' },
          { text: '链表', link: '/algorithm/linkedList' },
          { text: '二叉树', link: '/algorithm/binaryTree' },
          { text: '前端经典手写题', link: '/algorithm/handWrite' },
        ]
      },
      {
        text: '计算机基础',
        items: [
          { text: '计算机网络', link: '/basic/network' },
        ]
      }
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
