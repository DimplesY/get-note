<!-- eslint-disable no-alert -->
<script setup lang="ts">
import { downloadToMdFile, fetchMarkDownData } from '~/logic'

const loading = ref(false)
const url = ref<string>()
async function htmlToMarkDown(url: string) {
  loading.value = true
  const response = await fetchMarkDownData({ url })
  downloadToMdFile(response.markdown)
  window.close()
  loading.value = false
}

function handleDownload() {
  if (!url.value) {
    alert('你还没有输入网址')
    return
  }
  htmlToMarkDown(url.value)
}
</script>

<template>
  <main class="rounded text-center text-gray-700 w-[400px]">
    <!-- 标题区域 -->
    <h1 class="flex font-bold bg-blue-500 h-[45px] text-white text-[16px] tracking-[5px]  justify-center items-center">
      笔记拿来
    </h1>
    <!-- 下载地址输入框 -->
    <div class="mt-[5px] w-full px-[15px] px-[5px]">
      <input v-model="url" :disabled="loading" class="border-solid outline-none border-b-1 h-[50px] text-xs w-full transition block focus:border-blue-400" type="text" placeholder="请输入需要下载的文章链接">
    </div>
    <!-- 下载按钮 -->
    <div class="flex h-[50px] w-full px-[10px] justify-center items-center">
      <button :disabled="loading" class="bg-blue-400 rounded-[5px] h-[30px] shadow text-white w-[200px] flex justify-center items-center hover:bg-blue-500" @click="handleDownload">
        <ep:loading v-show="loading" class="animate-spin animate-duration-1000 mr-[5px]" />
        获得笔记
      </button>
    </div>

    <!-- 作者信息 -->
    <div class="flex flex-row-reverse h-[25px] px-[15px] overflow-hidden justify-between items-center">
      <a href="https://github.com/DimplesY">
        <uiw:github class="text-[15px] hover:text-blue-500" />
      </a>
    </div>
  </main>
</template>
