// .versionrc.js
module.exports = {
  header: '# CHANGELOG\n\n',
  types: [
    { type: 'feat', section: '🚀 新功能' },
    { type: 'fix', section: '🔧 修复' },
    { type: 'perf', section: '⚡ 性能优化' },
    { type: 'revert', section: '⏪ 回退' }
  ],
//   commitUrlFormat: 'https://github.com/your-username/your-repo/commit/{{hash}}',
//   compareUrlFormat: 'https://github.com/your-username/your-repo/compare/{{previousTag}}...{{currentTag}}',
  releaseCommitMessageFormat: '发布 {{currentTag}}',
  changelog: {
    transform(commit, context) {
      // 自定义提交信息格式
      if (commit.type === 'feat') {
        commit.emoji = '🚀';
      } else if (commit.type === 'fix') {
        commit.emoji = '🔧';
      }
      
      return `${commit.emoji || '📝'} ${commit.subject}`;
    },
    groupBy: 'type',
    commitGroupsSort: (a, b) => {
      const order = ['feat', 'fix', 'perf', 'revert'];
      return order.indexOf(a.title) - order.indexOf(b.title);
    },
    commitsSort: ['scope', 'subject']
  }
};