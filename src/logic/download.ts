import { ofetch } from 'ofetch'
import { Sitdown } from 'sitdown'

/**
 * 使用 uniCloud 编写的云函数
 */
const DOWNLOAD_API = 'https://0a4edb17-926b-4806-9801-e5685beac83c.bspapp.com/html-md'

interface MarkDownResponse {
  content: string
  markdown: string
}

interface MarkDownRequest {
  url: string
}

export async function fetchMarkDownData(data: MarkDownRequest) {
  const response = await ofetch<MarkDownResponse>(DOWNLOAD_API, { method: 'POST', body: data, responseType: 'json' })
  return response
}

export function downloadToMdFile(content: string, fileName = 'note', suffix = 'md') {
  const file = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `${fileName}.${suffix}`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const sitdown = new Sitdown(
  {
    keepFilter: ['style'],
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    hr: '---',
  },
)

export function processHtmlToMarkDown(html: string): string {
  return sitdown.HTMLToMD(html)
}
