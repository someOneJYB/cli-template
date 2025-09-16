
your-ts-lib/
├── src/
│   ├── index.ts              # 主入口文件，统一导出所有公共API
│   ├── core/                 # 核心实现、主要功能函数
│   │   ├── createStore.ts
│   │   ├── advancedAlgorithm.ts
│   │   └── index.ts          # 导出core下的所有内容
│   ├── hooks/                # （如果是基于React的库可选）自定义React Hooks
│   │   ├── useData.ts
│   │   └── index.ts
│   ├── types/                # 全局共享的类型定义文件
│   │   ├── index.ts
│   │   └── options.ts
│   ├── utils/                # 内部使用的工具函数
│   │   ├── helpers.ts
│   │   ├── validation.ts
│   │   └── index.ts
│   └── constants.ts          # 常量定义
├── tests/                    # 测试文件，保持和src目录结构一致
│   ├── core/
│   │   ├── createStore.test.ts
│   │   └── advancedAlgorithm.test.ts
│   └── utils/
│       └── helpers.test.ts
├── dist/                     # TSUP构建输出目录（通常被.gitignore忽略）
├── package.json
├── tsconfig.json
└── tsup.config.ts
