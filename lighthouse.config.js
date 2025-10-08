// lighthouse.config.js
export default {
  extends: 'lighthouse:default',
  settings: {
    onlyAudits: [
      'first-contentful-paint',
      'largest-contentful-paint',
      'cumulative-layout-shift',
      'total-blocking-time',
      'speed-index',
      'accessibility',
      'best-practices',
      'seo',
      'pwa'
    ],
  },
  audits: [
    'metrics/first-contentful-paint',
    'metrics/largest-contentful-paint',
    'metrics/cumulative-layout-shift',
    'metrics/total-blocking-time',
    'metrics/speed-index'
  ],
  categories: {
    performance: {
      title: 'Performance',
      auditRefs: [
        {id: 'first-contentful-paint', weight: 10, group: 'metrics'},
        {id: 'largest-contentful-paint', weight: 25, group: 'metrics'},
        {id: 'cumulative-layout-shift', weight: 25, group: 'metrics'},
        {id: 'total-blocking-time', weight: 30, group: 'metrics'},
        {id: 'speed-index', weight: 10, group: 'metrics'}
      ]
    }
  }
}