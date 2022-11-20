<!-- eslint-disable no-console -->
<script setup lang="ts">
import { postData } from '~/logic'
const loading = ref(false)

function htmlToMarkDown(url: string) {
  loading.value = true
  postData('https://0a4edb17-926b-4806-9801-e5685beac83c.bspapp.com/html-md', { url }).then((result) => {
    loading.value = false
    const file = new Blob([result.markdown], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'doc.md')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  })
}

const url = ref<string>()
function handleDownload() {
  if (!url.value) {
    alert('你还没有输入网址')
    return
  }

  htmlToMarkDown(url.value!)
}
</script>

<template>
  <main class="w-[400px] text-center text-gray-700 rounded">
    <!-- 标题区域 -->
    <h1 class="font-bold tracking-[5px] text-[15px] text-white bg-blue-500 h-[45px] flex  justify-center items-center">
      笔记拿来
    </h1>
    <!-- 下载地址输入框 -->
    <div class="w-full px-[10px] px-[5px]">
      <input v-model="url" class="block outline-none h-[50px] w-full  text-xs" type="text" placeholder="请输入需要下载的文章链接">
    </div>
    <!-- 下载按钮 -->
    <div class="w-full px-[10px] h-[50px] flex justify-center items-center">
      <button class="bg-blue-400 text-white w-[200px] h-[30px] shadow rounded-[5px] hover:bg-blue-500" @click="handleDownload">
        获得笔记
      </button>
    </div>

    <!-- 作者信息 -->
    <div class="h-[25px] px-[10px] overflow-hidden flex justify-between flex-row-reverse items-center">
      <a href="https://github.com/DimplesY">
        <uiw:github class="hover:text-blue-500 text-[15px]" />
      </a>
    </div>
  </main>
</template>
