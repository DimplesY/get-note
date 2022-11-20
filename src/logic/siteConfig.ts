interface SiteConfig {
  name: string
  urls: RegExp[]
  body: string[]
  title: string[]
}

const siteMap: Record<string, SiteConfig> = {
  CSDN: {
    name: 'CSDN',
    urls: [/csdn.net/g],
    title: ['.title-article'],
    body: ['.article_content .htmledit_views'],
  },
  JUEJIN: {
    name: 'juejin',
    urls: [/https:\/\/juejin.cn\/post\/(\d+)/g],
    title: ['.article-title'],
    body: ['.article-content .markdown-body'],
  },
  JIANSHU: {
    name: 'jianshu',
    urls: [/https:\/\/www.jianshu.com\/p\/(\d+|\w+)/g],
    title: ['h1'],
    body: ['article'],
  },
}

const otherSiteConfig: SiteConfig = {
  name: 'other',
  urls: [/.*/g],
  title: ['h1', 'h2'],
  body: ['article', '.content__default', '.article-content'],
}

export function getSiteConfig(url: string) {
  const currentSiteConfig = Object.keys(siteMap).filter(siteName => siteMap[siteName].urls.some(i => i.test(url)))
  return currentSiteConfig.length > 0 ? siteMap[currentSiteConfig[0]] : otherSiteConfig
}
