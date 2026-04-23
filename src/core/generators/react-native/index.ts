import { parseSvg } from '../react/svg-to-jsx'
import type { GeneratedFile, OptimizedIcon } from '../react'
import { generateIconComponent } from './template'
import { TYPES_FILE } from './static-files'

export function generateReactNativeIcons(icons: OptimizedIcon[]): GeneratedFile[] {
  const files: GeneratedFile[] = []

  files.push({ path: 'icons/types.ts', contents: TYPES_FILE })

  for (const icon of icons) {
    const { viewBox, children } = parseSvg(icon.svg)
    const code = generateIconComponent({
      componentName: icon.componentName,
      viewBox,
      children
    })
    files.push({ path: `icons/${icon.fileName}.tsx`, contents: code })
  }

  const exports = icons
    .map((i) => `export { default as ${i.componentName} } from './${i.fileName}'`)
    .join('\n')
  files.push({ path: 'icons/index.ts', contents: exports + '\n' })

  return files
}
