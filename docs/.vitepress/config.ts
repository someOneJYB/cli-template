import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'My Library',
  description: 'A powerful TypeScript library',
  base: '/my-library/',
  lastUpdated: true,
  
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '指南', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: '示例', link: '/examples/' },
      { text: '更新日志', link: '/changelog' },
      { text: 'GitHub', link: 'https://github.com/your-username/my-library' }
    ],
    
    sidebar: {
      '/guide/': [
        {
          text: '入门',
          collapsed: false,
          items: [
            { text: '介绍', link: '/guide/' },
            { text: '安装', link: '/guide/installation' },
            { text: '快速开始', link: '/guide/getting-started' }
          ]
        },
        {
          text: '高级指南',
          collapsed: true,
          items: [
            { text: '高级用法', link: '/guide/advanced' },
            { text: '性能优化', link: '/guide/performance' }
          ]
        }
      ],
      
      '/examples/': [
        {
          text: '示例',
          items: [
            { text: '基础示例', link: '/examples/basic' },
            { text: '高级示例', link: '/examples/advanced' },
            { text: '集成示例', link: '/examples/integration' }
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/my-library' }
    ],
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Your Name'
    },
    
    editLink: {
      pattern: 'https://github.com/your-username/my-library/edit/main/docs/:path'
    },
    
    search: {
      provider: 'local'
    }
  },
  
  markdown: {
    theme: 'material-theme-palenight',
    lineNumbers: true,
    config: (md) => {
      // 添加自定义 Markdown 插件
    }
  }
});