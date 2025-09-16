module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复bug
        'docs', // 文档更新
        'style', // 代码格式调整（不影响功能）
        'refactor', // 代码重构（不添加新功能也不修复bug）
        'test', // 测试相关
        'chore', // 构建或辅助工具变动
        'perf', // 性能优化
        'ci', // CI配置
        'revert', // 回退提交
        'build', // 构建相关
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'always', 'sentence-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'body-leading-blank': [2, 'always'],
    'body-max-line-length': [2, 'always', 200],
    'footer-leading-blank': [2, 'always'],
    'footer-max-line-length': [2, 'always', 200],
  },
};
