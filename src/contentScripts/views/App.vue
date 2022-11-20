<script setup lang="ts">
import { downloadToMdFile, getSiteConfig, processHtmlToMarkDown } from '~/logic'
import 'virtual:windi.css'

const siteConfig = getSiteConfig(location.href)

// 获取文章标题
function getArticleTitle(selector: string) {
  return document.querySelector(selector)?.textContent?.replace(/(<!-*>)|\s/g, '')
}

// 下载文章
function downloadArticle() {
  let articleTitle: string | undefined
  let html: string | undefined
  if (!siteConfig)
    return
  if (siteConfig.name === 'other') {
    for (let i = 0; i < siteConfig.title.length; i++) {
      articleTitle = getArticleTitle(siteConfig.title[i])
      if (articleTitle)
        break
    }
    for (let i = 0; i < siteConfig.title.length; i++) {
      html = document.querySelector(siteConfig.body[i])?.innerHTML?.replace(/<style>(.*)<\/style>/g, '')
      if (html)
        break
    }
  }
  else {
    articleTitle = getArticleTitle(siteConfig.title[0])
    html = document.querySelector(siteConfig.body[0])?.innerHTML?.replace(/<style>(.*)<\/style>/g, '')
  }

  if (html) {
    const md = processHtmlToMarkDown(html)
    downloadToMdFile(md, articleTitle)
    return
  }
  alert('这个页面好像不是Markdown编写的')
}
</script>

<template>
  <div v-if="siteConfig" title="点击下载当前文章" class="rounded-full shadow flex font-sans bg-teal-400 hover:bg-teal-500 h-[50px] m-5 text-white right-[100px] bottom-[150px] leading-1em w-[50px] z-100 fixed select-none justify-center items-center cursor-pointer" @click="downloadArticle">
    <typcn:pen />
  </div>
</template>
