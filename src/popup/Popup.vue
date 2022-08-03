<!-- eslint-disable no-console -->
<script setup lang="ts">
async function postData(url: string, data: object) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  return response.json() // parses JSON response into native JavaScript objects
}

const loading = ref(false)

function htmlToMarkDown(url: string) {
  loading.value = true
  postData('https://devtool.tech/api/html-md', { url }).then((result) => {
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
  <main class="w-[300px] px-4 py-5 text-center text-gray-700">
    <div v-show="loading">
      <eos-icons:bubble-loading class="text-30px" />
      <div class="mt-[10px]">
        获取中...
      </div>
    </div>
    <div v-show="!loading" class="flex flex-col justify-center items-center gap-y-10px">
      <h1 class="text-[15px]">
        笔 记 拿 来
      </h1>
      <div class="flex justify-center items-center gap-x-10px">
        <span>网址:</span>
        <input v-model="url" class="outline-none border-1 border-red-300 border-solid w-[150px] h-[25px] px-[10px]" type="text" placeholder="输入网址即可下载">
        <button class="hover:text-red-300 ml-[10px]" @click="handleDownload">
          下载
        </button>
      </div>
    </div>
  </main>
</template>
