import { zipSync } from 'fflate'
import type { GeneratedFile } from '../generators/react'

// Bundle files into a zip archive
export function createZip(files: GeneratedFile[], root = ''): Uint8Array {
  const zipData: Record<string, Uint8Array> = {}
  const encoder = new TextEncoder()

  for (const file of files) {
    const path = root !== '' ? `${root}/${file.path}` : file.path
    zipData[path] = encoder.encode(file.contents)
  }

  return zipSync(zipData)
}

// Trigger browser download of zip file
export function downloadZip(data: Uint8Array, filename: string): void {
  const blob = new Blob([new Uint8Array(data)], { type: 'application/zip' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
