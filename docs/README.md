**library**

***

src/
├── index.ts              # 主入口文件，导出所有公共 API
├── core/                 # 核心功能模块
│   ├── index.ts          # 核心模块导出
│   ├── utils.ts          # 工具函数
│   ├── types.ts          # 类型定义
│   └── constants.ts      # 常量定义
├── features/             # 功能模块（根据库的领域划分）
│   ├── moduleA/
│   │   ├── index.ts
│   │   ├── types.ts
│   │   └── implementation.ts
│   └── moduleB/
│       ├── index.ts
│       └── implementation.ts
├── hooks/                # 自定义 Hooks（如果适用）
│   ├── useExample.ts
│   └── index.ts
└── __tests__/            # 单元测试（可选，通常测试放在根目录的 test/）
    ├── core/
    └── features/
