import { parseSvg } from './svg-to-jsx'
import { generateIconComponent } from './template'

export type GeneratedFile = { path: string; contents: string }

export type OptimizedIcon = {
  nodeId: string
  name: string
  svg: string
  componentName: string
  fileName: string
}

export function generateReactIcons(icons: OptimizedIcon[]): GeneratedFile[] {
  const files: GeneratedFile[] = []

  for (const icon of icons) {
    const { viewBox, children } = parseSvg(icon.svg)
    const code = generateIconComponent({
      componentName: icon.componentName,
      viewBox,
      children
    })
    files.push({ path: `${icon.fileName}.tsx`, contents: code })
  }

  return files
}
